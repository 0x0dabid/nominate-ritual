import postgres from "postgres";

export function getDb() {
  return postgres(process.env.DATABASE_URL!, { ssl: "require" });
}

export async function initDb() {
  const sql = getDb();

  await sql`
    CREATE TABLE IF NOT EXISTS nominees (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL,
      discord_id TEXT,
      role TEXT NOT NULL,
      nominator TEXT NOT NULL,
      votes INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(username, role)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS votes (
      id SERIAL PRIMARY KEY,
      voter_id TEXT NOT NULL,
      nominee_id INTEGER NOT NULL REFERENCES nominees(id),
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(voter_id, nominee_id)
    )
  `;
}
