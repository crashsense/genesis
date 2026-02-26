"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#030014]/60 backdrop-blur-md border-b border-white/[0.04]"
    >
      <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-[18px] h-[18px] text-indigo-400/80" strokeWidth={1.8} />
          <span className="text-sm font-medium tracking-wide text-gray-300">
            GENESIS
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-5 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
            Ready
          </span>
          <span className="text-gray-700">|</span>
          <span>Idea Fusion Engine</span>
        </div>
      </div>
    </motion.header>
  );
}
