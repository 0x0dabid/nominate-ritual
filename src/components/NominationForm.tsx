"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { ROLES } from "@/lib/roles";

export default function NominationForm() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    username: "",
    discord_id: "",
    role: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!session?.user) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/nominations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          nominator: session.user.username || session.user.name,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Nomination submitted successfully!");
        setFormData({ username: "", discord_id: "", role: "" });
      } else {
        setStatus("error");
        setMessage(data.details || data.error || "Failed to submit nomination");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }

    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 4000);
  }

  return (
    <section id="nominate" className="relative py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            <span className="text-blue-400">&#10022;</span> Submit Your
            Nomination <span className="text-blue-400">&#10022;</span>
          </h2>
        </motion.div>

        {!session?.user ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative p-12 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl text-center"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-50" />
            <div className="relative">
              <p className="text-gray-400 mb-6 text-lg">
                Sign in with Discord to submit a nomination
              </p>
              <button
                onClick={() => signIn("discord")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5865F2] text-white font-semibold hover:bg-[#4752C4] transition-all duration-300"
              >
                <svg
                  width="20"
                  height="15"
                  viewBox="0 0 71 55"
                  fill="currentColor"
                >
                  <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.868 44.6391 54.2402 44.9293 54.6152 45.2082C52.8268 46.6168 50.9881 47.4931 49.0571 48.2228C50.0034 50.6035 51.2208 52.5700 52.5581 54.4350C58.6069 52.7249 64.4896 50.0174 70.5625 45.5576C72.1249 30.0791 68.1782 16.7757 60.1968 4.9823Z" />
                </svg>
                Sign in with Discord
              </button>
              <p className="text-gray-600 text-sm mt-4">
                You must be a member of the Ritual server
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl"
          >
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-50" />

            <div className="relative space-y-5">
              {/* Logged in as */}
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                <span>Nominating as</span>
                <span className="font-semibold">
                  {session.user.username || session.user.name}
                </span>
              </div>

              {/* Discord Username */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 71 55"
                    fill="#5865F2"
                  >
                    <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.868 44.6391 54.2402 44.9293 54.6152 45.2082C52.8268 46.6168 50.9881 47.4931 49.0571 48.2228C50.0034 50.6035 51.2208 52.5700 52.5581 54.4350C58.6069 52.7249 64.4896 50.0174 70.5625 45.5576C72.1249 30.0791 68.1782 16.7757 60.1968 4.9823Z" />
                  </svg>
                  Nominee&apos;s Discord Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                  placeholder="Enter Discord username to nominate"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all"
                />
              </div>

              {/* Discord ID */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Nominee&apos;s Discord ID (optional)
                </label>
                <input
                  type="text"
                  value={formData.discord_id}
                  onChange={(e) =>
                    setFormData({ ...formData, discord_id: e.target.value })
                  }
                  placeholder="Enter Discord ID"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all"
                />
              </div>

              {/* Role Selector */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">
                  Nominate for Role
                </label>
                <div className="relative">
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#1a1a2e]">
                      Select a role...
                    </option>
                    {ROLES.map((role) => (
                      <option
                        key={role.name}
                        value={role.name}
                        className="bg-[#1a1a2e]"
                      >
                        {role.emoji} {role.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Nomination ✦"
                )}
              </motion.button>

              {/* Status message */}
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center text-sm ${
                    status === "success" ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {message}
                </motion.p>
              )}
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
