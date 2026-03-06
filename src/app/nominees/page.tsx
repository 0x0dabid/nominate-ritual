"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ROLES } from "@/lib/roles";

interface Nominee {
  id: number;
  username: string;
  discord_id: string | null;
  role: string;
  votes: number;
  nominator: string;
}

export default function NomineesPage() {
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [votedFor, setVotedFor] = useState<Set<number>>(new Set());
  const [animatingId, setAnimatingId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>(ROLES[0].name);

  const fetchNominees = useCallback(async () => {
    try {
      const res = await fetch("/api/nominees");
      const data = await res.json();
      setNominees(data.nominees || []);
    } catch {
      // Silent fail
    }
  }, []);

  useEffect(() => {
    fetchNominees();
    const stored = localStorage.getItem("synful-votes");
    if (stored) {
      setVotedFor(new Set(JSON.parse(stored)));
    }
  }, [fetchNominees]);

  async function handleVote(nomineeId: number) {
    if (votedFor.has(nomineeId)) return;

    const voterId =
      localStorage.getItem("synful-voter-id") || crypto.randomUUID();
    localStorage.setItem("synful-voter-id", voterId);

    try {
      const res = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voter_id: voterId, nominee_id: nomineeId }),
      });

      if (res.ok) {
        setAnimatingId(nomineeId);
        setTimeout(() => setAnimatingId(null), 600);

        const newVoted = new Set(votedFor);
        newVoted.add(nomineeId);
        setVotedFor(newVoted);
        localStorage.setItem(
          "synful-votes",
          JSON.stringify([...newVoted])
        );

        setNominees((prev) =>
          prev.map((n) =>
            n.id === nomineeId ? { ...n, votes: n.votes + 1 } : n
          )
        );
      }
    } catch {
      // Silent fail
    }
  }

  const filteredNominees = nominees.filter((n) => n.role === activeTab);
  const activeRole = ROLES.find((r) => r.name === activeTab)!;

  return (
    <main className="min-h-screen bg-[#0a0a1a]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-[#0a0a1a]/80 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-wider text-white">
            RITUAL
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          &larr; Back to Home
        </Link>
      </nav>

      <div className="pt-28 pb-20 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Nominees
          </h1>
          <p className="text-gray-400 text-lg">
            Vote for the most devoted members of the Ritual
          </p>
        </motion.div>

        {/* Role Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {ROLES.map((role) => (
            <button
              key={role.name}
              onClick={() => setActiveTab(role.name)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${
                activeTab === role.name
                  ? `${role.bg} ${role.border} text-white shadow-lg`
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
              }`}
            >
              {role.emoji} {role.name}
            </button>
          ))}
        </motion.div>

        {/* Leaderboard */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Role Header */}
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold ${activeRole.text}`}>
                {activeRole.emoji} {activeRole.name} Leaderboard
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {activeRole.tagline}
              </p>
            </div>

            {filteredNominees.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                  No nominees yet for this role.
                </p>
                <Link
                  href="/#nominate"
                  className="inline-block mt-4 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Be the first to nominate &rarr;
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 max-w-3xl mx-auto">
                {filteredNominees.map((nominee, i) => (
                  <motion.div
                    key={nominee.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r ${activeRole.gradient} border ${activeRole.border} backdrop-blur-xl group hover:scale-[1.01] transition-transform`}
                  >
                    {/* Rank */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        i === 0
                          ? `${activeRole.bg} text-white`
                          : "bg-white/10 text-gray-300"
                      }`}
                    >
                      #{i + 1}
                    </div>

                    {/* Avatar */}
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${activeRole.gradient} border-2 ${activeRole.border} flex items-center justify-center text-lg font-bold ${activeRole.text}`}
                    >
                      {nominee.username.charAt(0).toUpperCase()}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold truncate">
                        {nominee.username}
                      </p>
                      {nominee.discord_id && (
                        <p className="text-gray-500 text-xs">
                          ID: {nominee.discord_id}
                        </p>
                      )}
                    </div>

                    {/* Votes */}
                    <div className="flex items-center gap-3">
                      <span className="text-gray-300 text-sm">
                        <span className="text-red-400">&#10084;</span>{" "}
                        {nominee.votes}
                      </span>

                      <motion.button
                        onClick={() => handleVote(nominee.id)}
                        disabled={votedFor.has(nominee.id)}
                        whileHover={
                          !votedFor.has(nominee.id) ? { scale: 1.1 } : {}
                        }
                        whileTap={
                          !votedFor.has(nominee.id) ? { scale: 0.9 } : {}
                        }
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                          votedFor.has(nominee.id)
                            ? "bg-white/5 text-gray-500 cursor-not-allowed border border-white/5"
                            : "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                        }`}
                      >
                        {animatingId === nominee.id ? (
                          <motion.span
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.4 }}
                          >
                            &#10084;
                          </motion.span>
                        ) : votedFor.has(nominee.id) ? (
                          "Voted"
                        ) : (
                          <>&#10084; Vote</>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4 text-center text-gray-500 text-sm">
        &copy; 2026 Ritual Community. All rights reserved.
      </footer>
    </main>
  );
}
