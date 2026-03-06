import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    env: {
      DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID ? "set" : "MISSING",
      DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET ? "set" : "MISSING",
      DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID ? "set" : "MISSING",
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "set" : "MISSING",
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "MISSING",
      DATABASE_URL: process.env.DATABASE_URL ? "set" : "MISSING",
    },
  });
}
