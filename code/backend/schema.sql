CREATE TABLE IF NOT EXISTS nodes (
  code TEXT PRIMARY KEY, name TEXT, lat REAL, lng REAL
);
CREATE TABLE IF NOT EXISTS edges (
  id INTEGER PRIMARY KEY, u TEXT, v TEXT, name TEXT, risk REAL, note TEXT
);
CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY, edge_id INTEGER, lat REAL, lng REAL,
  categories TEXT, description TEXT, photo TEXT, created REAL
);
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY, name TEXT, phone TEXT
);
CREATE TABLE IF NOT EXISTS sos (
  id TEXT PRIMARY KEY, contact_id INTEGER, lat REAL, lng REAL, active INTEGER, updated REAL
);