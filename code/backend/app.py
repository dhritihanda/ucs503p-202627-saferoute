import os, time, uuid
from flask import Flask, jsonify, request
from flask_cors import CORS
from database import UPLOAD_DIR, close_db, get_db, get_nodes
from routing import build_route
from safety import add_report, heatmap
from seed import seed

app = Flask(__name__)
CORS(app)
app.teardown_appcontext(close_db)
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/api/places")
def places():
    nodes = get_nodes(get_db())
    return jsonify([{"id": k, "name": v[0], "lat": v[1], "lng": v[2]} for k, v in nodes.items()])


@app.get("/api/heatmap")
def heatmap_route():
    return jsonify(heatmap(get_db(), request.args.get("night") == "1"))


@app.get("/api/route")
def route():
    result = build_route(get_db(), request.args["from"], request.args["to"],
                         request.args.get("night") == "1")
    return (jsonify(result), 200) if result else (jsonify(error="No route"), 404)


@app.post("/api/reports")
def create_report():
    f = request.form
    photo = None
    file = request.files.get("photo")
    if file and file.filename:
        photo = uuid.uuid4().hex + os.path.splitext(file.filename)[1]
        file.save(os.path.join(UPLOAD_DIR, photo))
    segment, risk = add_report(get_db(), float(f["lat"]), float(f["lng"]),
                               f.get("categories", ""), f.get("description", ""), photo)
    return jsonify(ok=True, segment=segment, new_risk=risk), 201


@app.get("/api/reports")
def list_reports():
    rows = get_db().execute("SELECT * FROM reports ORDER BY created DESC LIMIT 20")
    return jsonify([dict(r) for r in rows])


@app.route("/api/contacts", methods=["GET", "POST"])
def contacts():
    db = get_db()
    if request.method == "POST":
        j = request.get_json()
        db.execute("INSERT INTO contacts(name,phone) VALUES (?,?)", (j["name"], j["phone"]))
        db.commit()
    return jsonify([dict(r) for r in db.execute("SELECT * FROM contacts")])


@app.post("/api/sos")
def sos_start():
    db, j = get_db(), request.get_json()
    sid = uuid.uuid4().hex[:8]
    db.execute("INSERT INTO sos VALUES (?,?,?,?,1,?)", (sid, j["contact_id"], j["lat"], j["lng"], time.time()))
    db.commit()
    c = db.execute("SELECT * FROM contacts WHERE id=?", (j["contact_id"],)).fetchone()
    # SIMULATED: a real build would send an SMS (for example with Twilio).
    print(f"[SMS simulated] to {c['phone']}: live location http://localhost:5173/track/{sid}")
    return jsonify(id=sid, link=f"/track/{sid}", notified=c["name"]), 201


@app.route("/api/sos/<sid>", methods=["GET", "PUT", "DELETE"])
def sos(sid):
    db = get_db()
    if request.method == "PUT":
        j = request.get_json()
        db.execute("UPDATE sos SET lat=?, lng=?, updated=? WHERE id=? AND active=1",
                   (j["lat"], j["lng"], time.time(), sid))
    if request.method == "DELETE":
        db.execute("UPDATE sos SET active=0 WHERE id=?", (sid,))
    db.commit()
    row = db.execute("SELECT * FROM sos WHERE id=?", (sid,)).fetchone()
    return jsonify(dict(row)) if row else (jsonify(error="not found"), 404)


if __name__ == "__main__":
    seed()
    app.run(port=5000, debug=True)