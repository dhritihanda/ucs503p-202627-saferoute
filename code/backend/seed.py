import sqlite3
from database import DB_PATH, init_db

NODES = [
    ("G1", "Thapar Gate 1", 30.3545, 76.3640), ("A", "Bus Stand Rd Jn", 30.3560, 76.3650),
    ("B", "Library Block", 30.3575, 76.3665), ("C", "Model Town Chowk", 30.3560, 76.3675),
    ("D", "Station Rd Jn", 30.3580, 76.3685), ("E", "Campus Rd Jn", 30.3590, 76.3660),
    ("F", "Campus Rd North", 30.3600, 76.3680), ("BUS", "Rajpura Bus Stand", 30.3610, 76.3700),
]
EDGES = [
    ("G1", "A", "Bus Stand Rd", .10, "Well-lit main road"),
    ("A", "C", "Model Town Ln", .80, "Dim stretch, 80m"),
    ("C", "D", "Model Town Ln", .70, "Isolated, no foot traffic"),
    ("D", "BUS", "Station Rd", .30, "Mixed reports"),
    ("A", "B", "Bus Stand Rd", .10, "Well-lit, foot traffic"),
    ("B", "E", "Campus Rd", .10, "Verified safe"),
    ("E", "F", "Campus Rd", .15, "Verified safe"),
    ("F", "BUS", "Campus Rd", .10, "Verified safe, shops open"),
    ("B", "D", "Link Ln", .50, "Poorly lit after 8 pm"),
]


def seed():
    init_db()
    conn = sqlite3.connect(DB_PATH)
    if not conn.execute("SELECT 1 FROM edges").fetchone():
        conn.executemany("INSERT INTO nodes VALUES (?,?,?,?)", NODES)
        conn.executemany("INSERT INTO edges(u,v,name,risk,note) VALUES (?,?,?,?,?)", EDGES)
        conn.execute("INSERT INTO contacts(name,phone) VALUES ('Mom','+91 98765 43210')")
    conn.commit()
    conn.close()


if __name__ == "__main__":
    seed()
    print("Database seeded.")