import time
from database import get_nodes


def eff_risk(risk, night):
    """Risk is higher at night."""
    return min(1.0, risk * 1.25) if night else risk


def level(risk):
    return "safe" if risk < .3 else "mixed" if risk < .6 else "risk"


def heatmap(db, night):
    nodes = get_nodes(db)
    out = []
    for e in db.execute("SELECT * FROM edges"):
        a, b = nodes[e["u"]], nodes[e["v"]]
        out.append({"id": e["id"], "name": e["name"], "note": e["note"],
                    "risk": eff_risk(e["risk"], night),
                    "path": [[a[1], a[2]], [b[1], b[2]]]})
    return out


def add_report(db, lat, lng, categories, description, photo):
    """Save a report and raise the risk of the nearest road segment."""
    nodes = get_nodes(db)

    def distance(e):
        a, b = nodes[e["u"]], nodes[e["v"]]
        return abs((a[1] + b[1]) / 2 - lat) + abs((a[2] + b[2]) / 2 - lng)

    edge = min(db.execute("SELECT * FROM edges"), key=distance)
    db.execute("INSERT INTO reports(edge_id,lat,lng,categories,description,photo,created) VALUES (?,?,?,?,?,?,?)",
               (edge["id"], lat, lng, categories, description, photo, time.time()))
    new_risk = min(1.0, edge["risk"] + .15)
    db.execute("UPDATE edges SET risk=?, note=? WHERE id=?",
               (new_risk, f"Reported: {categories or 'unsafe'}", edge["id"]))
    db.commit()
    return edge["name"], round(new_risk, 2)