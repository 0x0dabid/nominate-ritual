import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
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

    const session = await getServerSession(authOptions);
    if (!session?.user?.discordId) {
      return NextResponse.json({ voted_for: [] });
    }

    const sql = getDb();
    const votes = await sql`
      SELECT nominee_id FROM votes WHERE voter_id = ${session.user.discordId}
    `;

    return NextResponse.json({
      voted_for: votes.map((v) => v.nominee_id),
    });
  } catch (err) {
    console.error("My votes fetch error:", err);
    return NextResponse.json({ voted_for: [] });
  }
}
