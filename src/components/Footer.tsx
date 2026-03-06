"use client";

import { motion } from "framer-motion";

const links = [
  { label: "Discord", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-white/5 py-10 px-4"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-gray-500 text-sm">
          &copy; 2026 Ritual Community. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
