"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070718] via-[#0c0c2a] to-[#0a0a1a]" />

      {/* Radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[80px]" />

      {/* Geometric sacred symbol */}
      <div className="absolute top-[12%] left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 opacity-20"
        >
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <polygon
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
              stroke="url(#glow1)"
              strokeWidth="0.5"
            />
            <polygon
              points="50,15 85,32.5 85,67.5 50,85 15,67.5 15,32.5"
              stroke="url(#glow1)"
              strokeWidth="0.5"
            />
            <circle
              cx="50"
              cy="50"
              r="20"
              stroke="url(#glow1)"
              strokeWidth="0.5"
            />
            <defs>
              <linearGradient id="glow1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      {/* Hooded figures silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-8 opacity-30">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 1 }}
            className="w-32 h-64 bg-gradient-to-t from-gray-900 to-transparent rounded-t-full"
            style={{
              transform: `translateY(${Math.abs(i - 2) * 15}px)`,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-20 text-center px-4">
        {/* Sacred symbol above title */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <img
            src="/logo.svg"
            alt="Ritual Logo"
            width={80}
            height={80}
            className="drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent tracking-tight"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Synful Blessings
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg mx-auto"
        >
          Recognize the most devoted members of the Ritual
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#nominate"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40"
          >
            Nominate a Ritualist
          </a>
          <Link
            href="/nominees"
            className="px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            View Nominees
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
