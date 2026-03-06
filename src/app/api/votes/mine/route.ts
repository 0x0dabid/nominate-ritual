import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import getDb from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.discordId) {
      return NextResponse.json({ voted_for: [] });
    }

    const db = getDb();
    const votes = db
      .prepare("SELECT nominee_id FROM votes WHERE voter_id = ?")
      .all(session.user.discordId) as { nominee_id: number }[];

    return NextResponse.json({
      voted_for: votes.map((v) => v.nominee_id),
    });
  } catch {
    return NextResponse.json({ voted_for: [] });
  }
}
