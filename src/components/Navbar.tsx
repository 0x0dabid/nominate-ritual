"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-[#0a0a1a]/80 border-b border-white/5"
    >
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

      <div className="flex items-center gap-3">
        {status === "loading" ? (
          <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
        ) : session?.user ? (
          <div className="flex items-center gap-3">
            {/* User avatar */}
            {session.user.avatar && session.user.discordId ? (
              <img
                src={`https://cdn.discordapp.com/avatars/${session.user.discordId}/${session.user.avatar}.png?size=64`}
                alt="Avatar"
                className="w-8 h-8 rounded-full border border-white/20"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                {(session.user.username || session.user.name || "?")
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}
            <span className="text-sm text-gray-300 hidden sm:block">
              {session.user.username || session.user.name}
            </span>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 text-sm"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("discord")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5865F2]/20 border border-[#5865F2]/40 text-[#5865F2] hover:bg-[#5865F2]/30 transition-all duration-300 text-sm font-medium"
          >
            <svg
              width="20"
              height="15"
              viewBox="0 0 71 55"
              fill="currentColor"
            >
              <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.868 44.6391 54.2402 44.9293 54.6152 45.2082C54.7438 45.304 54.7354 45.5041 54.5955 45.5858C52.8268 46.6168 50.9881 47.4931 49.0571 48.2228C48.9312 48.2707 48.8752 48.4172 48.9368 48.5383C50.0034 50.6035 51.2208 52.5700 52.5581 54.4350C52.6140 54.5139 52.7148 54.5477 52.8071 54.5195C58.6069 52.7249 64.4896 50.0174 70.5625 45.5576C70.6157 45.5182 70.6493 45.4590 70.6549 45.3942C72.1249 30.0791 68.1782 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978Z" />
            </svg>
            Sign In
          </button>
        )}
      </div>
    </motion.nav>
  );
}
