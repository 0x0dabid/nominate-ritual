import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.discordId) {
      return NextResponse.json(
        { error: "You must be signed in to vote" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { nominee_id } = body;
    const voter_id = session.user.discordId;

    if (!nominee_id) {
      return NextResponse.json(
        { error: "Missing nominee_id" },
        { status: 400 }
      );
    }

    const sql = getDb();

    const nominee = await sql`
      SELECT id FROM nominees WHERE id = ${nominee_id}
    `;
    if (nominee.length === 0) {
      return NextResponse.json(
        { error: "Nominee not found" },
        { status: 404 }
      );
    }

    const existingVote = await sql`
      SELECT id FROM votes WHERE voter_id = ${voter_id} AND nominee_id = ${nominee_id}
    `;

    if (existingVote.length > 0) {
      return NextResponse.json(
        { error: "Already voted for this nominee" },
        { status: 409 }
      );
    }

    await sql`
      INSERT INTO votes (voter_id, nominee_id) VALUES (${voter_id}, ${nominee_id})
    `;
    await sql`
      UPDATE nominees SET votes = votes + 1 WHERE id = ${nominee_id}
    `;

    const updated = await sql`
      SELECT votes FROM nominees WHERE id = ${nominee_id}
    `;

    return NextResponse.json({ success: true, votes: updated[0].votes });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
