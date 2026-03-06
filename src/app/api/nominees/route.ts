import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const sql = getDb();
    const nominees = await sql`
      SELECT * FROM nominees ORDER BY votes DESC, created_at ASC
    `;

    return NextResponse.json({ nominees });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
