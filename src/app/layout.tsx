import type { Metadata } from "next";
import "./globals.css";
import "@/lib/types";
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "Synful Blessings — Ritual Community",
  description:
    "Recognize the most devoted members of the Ritual. Nominate and vote for community leaders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0a0a1a] text-white min-h-screen">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
