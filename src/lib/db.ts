import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "synful.db");

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(dbPath);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initDb(db);
  }
  return db;
}

function initDb(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS nominees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      discord_id TEXT,
      role TEXT NOT NULL CHECK(role IN ('Radiant Ritualist', 'Ritualist', 'ritty', 'ritty bitty')),
      nominator TEXT NOT NULL,
      votes INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(username, role)
    );

    CREATE TABLE IF NOT EXISTS votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      voter_id TEXT NOT NULL,
      nominee_id INTEGER NOT NULL REFERENCES nominees(id),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(voter_id, nominee_id)
    );
  `);
}

export default getDb;
