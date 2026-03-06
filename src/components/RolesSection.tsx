"use client";

import { motion } from "framer-motion";
import { ROLES } from "@/lib/roles";

export default function RolesSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            <span className="text-purple-400">&#10022;</span> Roles &amp;
            Recognition <span className="text-purple-400">&#10022;</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROLES.map((role, i) => (
            <motion.div
              key={role.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`relative p-6 rounded-2xl bg-gradient-to-b ${role.gradient} border ${role.border} backdrop-blur-xl overflow-hidden group`}
            >
              {/* Glow */}
              <div
                className={`absolute -inset-1 bg-gradient-to-b ${role.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
              />

              <div className="relative">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{role.emoji}</span>
                  <div>
                    <h3 className={`font-bold ${role.text}`}>
                      @{role.name}
                    </h3>
                  </div>
                </div>

                {/* Tagline badge */}
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${role.bg}/20 ${role.text} border ${role.border} mb-4`}
                >
                  {role.tagline}
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {role.description}
                </p>

                {/* Perks */}
                <ul className="space-y-2">
                  {role.perks.map((perk, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <span
                        className={`w-2 h-2 rounded-sm ${role.bg} mt-1.5 shrink-0`}
                      />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
