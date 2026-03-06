"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { motion } from "framer-motion";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const isNotMember = error === "not_member";

  return (
    <main className="min-h-screen bg-[#0a0a1a] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="text-6xl mb-6">{isNotMember ? "🚫" : "⚠️"}</div>
        <h1 className="text-3xl font-bold text-white mb-4">
          {isNotMember ? "Access Denied" : "Authentication Error"}
        </h1>
        <p className="text-gray-400 mb-8">
          {isNotMember
            ? "You must be a member of the Ritual Discord server to access Synful Blessings."
            : "Something went wrong during sign in. Please try again."}
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all"
        >
          Back to Home
        </Link>
      </motion.div>
    </main>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
          <p className="text-gray-400">Loading...</p>
        </main>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
