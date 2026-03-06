import { NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();
    const nominees = db
      .prepare("SELECT * FROM nominees ORDER BY votes DESC, created_at ASC")
      .all();

    return NextResponse.json({ nominees });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
