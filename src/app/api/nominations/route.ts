import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

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

    const sql = getDb();

    const existing = await sql`
      SELECT id FROM nominees WHERE username = ${username} AND role = ${role}
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "This user has already been nominated for this role" },
        { status: 409 }
      );
    }

    const result = await sql`
      INSERT INTO nominees (username, discord_id, role, nominator)
      VALUES (${username}, ${discord_id || null}, ${role}, ${nominator})
      RETURNING id
    `;

    return NextResponse.json(
      { success: true, id: result[0].id },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
