import { NextResponse } from "next/server";
import { getDb, initDb } from "@/lib/db";

let dbInitialized = false;

async function ensureDb() {
  if (!dbInitialized) {
    await initDb();
    dbInitialized = true;
  }
}

export async function GET() {
  try {
    await ensureDb();

    const sql = getDb();
    const nominees = await sql`
      SELECT * FROM nominees ORDER BY votes DESC, created_at ASC
    `;

    return NextResponse.json({ nominees });
  } catch (err) {
    console.error("Nominees fetch error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
