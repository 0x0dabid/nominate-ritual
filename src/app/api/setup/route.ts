import { NextResponse } from "next/server";
import { initDb } from "@/lib/db";

export async function GET() {
  try {
    await initDb();
    return NextResponse.json({ success: true, message: "Database tables created" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to initialize database", details: String(err) },
      { status: 500 }
    );
  }
}
