import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, discord_id, role, nominator } = body;

    if (!username || !role || !nominator) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const validRoles = [
      "Radiant Ritualist",
      "Ritualist",
      "ritty",
      "ritty bitty",
    ];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const db = getDb();

    const existing = db
      .prepare("SELECT id FROM nominees WHERE username = ? AND role = ?")
      .get(username, role);

    if (existing) {
      return NextResponse.json(
        { error: "This user has already been nominated for this role" },
        { status: 409 }
      );
    }

    const stmt = db.prepare(
      "INSERT INTO nominees (username, discord_id, role, nominator) VALUES (?, ?, ?, ?)"
    );
    const result = stmt.run(username, discord_id || null, role, nominator);

    return NextResponse.json(
      { success: true, id: result.lastInsertRowid },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
