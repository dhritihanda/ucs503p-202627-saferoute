import os, sqlite3
from flask import g

BASE = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE, "saferoute.db")
UPLOAD_DIR = os.path.join(BASE, "uploads")


def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row
    return g.db


def close_db(_=None):
    db = g.pop("db", None)
    if db:
        db.close()


def init_db():
    conn = sqlite3.connect(DB_PATH)
    with open(os.path.join(BASE, "schema.sql")) as f:
        conn.executescript(f.read())
    conn.commit()
    conn.close()


def get_nodes(db):
    return {r["code"]: (r["name"], r["lat"], r["lng"]) for r in db.execute("SELECT * FROM nodes")}