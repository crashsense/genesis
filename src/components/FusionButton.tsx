"use client";

import { motion } from "framer-motion";
import { Zap, Loader2 } from "lucide-react";

interface FusionButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}

export default function FusionButton({ onClick, disabled, isLoading }: FusionButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex flex-col items-center gap-4"
    >
      {/* Reactor Core Visual */}
      <div className="relative">
        {isLoading && (
          <>
            <div className="absolute inset-0 -m-8 rounded-full reactor-core animate-fusion-pulse" />
            <div className="absolute inset-0 -m-12 rounded-full reactor-core animate-fusion-pulse opacity-30" style={{ animationDelay: "0.5s" }} />
            <div className="absolute inset-0 -m-16 rounded-full reactor-core animate-fusion-pulse opacity-15" style={{ animationDelay: "1s" }} />
          </>
        )}
        <motion.button
          onClick={onClick}
          disabled={disabled}
          whileHover={!disabled ? { scale: 1.05 } : undefined}
          whileTap={!disabled ? { scale: 0.95 } : undefined}
          className={`
            relative z-10 px-12 py-5 rounded-2xl
            font-semibold text-lg tracking-wide
            transition-all duration-300
            ${
              disabled
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : isLoading
                ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-500/25"
                : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:shadow-2xl hover:shadow-purple-500/30 active:shadow-purple-500/50"
            }
          `}
        >
          <span className="flex items-center gap-3">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Fusion In Progress...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Initiate Fusion
              </>
            )}
          </span>
        </motion.button>
      </div>
      {!isLoading && !disabled && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-gray-600 text-center"
        >
          Powered by structural analogy discovery
        </motion.p>
      )}
    </motion.div>
  );
}
