import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { voter_id, nominee_id } = body;

    if (!voter_id || !nominee_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = getDb();

    const nominee = db
      .prepare("SELECT id FROM nominees WHERE id = ?")
      .get(nominee_id);
    if (!nominee) {
      return NextResponse.json(
        { error: "Nominee not found" },
        { status: 404 }
      );
    }

    const existingVote = db
      .prepare("SELECT id FROM votes WHERE voter_id = ? AND nominee_id = ?")
      .get(voter_id, nominee_id);

    if (existingVote) {
      return NextResponse.json(
        { error: "Already voted for this nominee" },
        { status: 409 }
      );
    }

    const vote = db.prepare(
      "INSERT INTO votes (voter_id, nominee_id) VALUES (?, ?)"
    );
    const update = db.prepare(
      "UPDATE nominees SET votes = votes + 1 WHERE id = ?"
    );

    const transaction = db.transaction(() => {
      vote.run(voter_id, nominee_id);
      update.run(nominee_id);
    });

    transaction();

    const updated = db
      .prepare("SELECT votes FROM nominees WHERE id = ?")
      .get(nominee_id) as { votes: number };

    return NextResponse.json({ success: true, votes: updated.votes });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
