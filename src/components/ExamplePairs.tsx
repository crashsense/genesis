"use client";

import { motion } from "framer-motion";
import { Shuffle } from "lucide-react";
import { EXAMPLE_PAIRS } from "@/lib/prompts";

interface ExamplePairsProps {
  onSelect: (conceptA: string, conceptB: string) => void;
  disabled: boolean;
}

export default function ExamplePairs({ onSelect, disabled }: ExamplePairsProps) {
  const handleRandom = () => {
    const pair = EXAMPLE_PAIRS[Math.floor(Math.random() * EXAMPLE_PAIRS.length)];
    onSelect(pair.conceptA, pair.conceptB);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="text-center"
    >
      <p className="text-sm text-gray-500 mb-3">Need inspiration? Try these:</p>
      <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
        {EXAMPLE_PAIRS.slice(0, 4).map((pair, i) => (
          <button
            key={i}
            onClick={() => onSelect(pair.conceptA, pair.conceptB)}
            disabled={disabled}
            className="px-3 py-1.5 rounded-full text-xs glass hover:bg-white/[0.06] transition-colors text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {pair.conceptA} × {pair.conceptB}
          </button>
        ))}
        <button
          onClick={handleRandom}
          disabled={disabled}
          className="px-3 py-1.5 rounded-full text-xs glass hover:bg-white/[0.06] transition-colors text-purple-400 hover:text-purple-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          <Shuffle className="w-3 h-3" />
          Random
        </button>
      </div>
    </motion.div>
  );
}
