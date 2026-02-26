"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, GitBranch, Lightbulb, Sparkles, CheckCircle2 } from "lucide-react";
import type { FusionStage } from "@/lib/types";

interface StageIndicatorProps {
  stage: FusionStage;
}

const STAGES: { key: FusionStage; label: string; icon: React.ElementType }[] = [
  { key: "decomposing", label: "Decomposing", icon: Search },
  { key: "mapping", label: "Mapping", icon: GitBranch },
  { key: "synthesizing", label: "Synthesizing", icon: Lightbulb },
  { key: "breakthrough", label: "Breakthrough", icon: Sparkles },
  { key: "complete", label: "Complete", icon: CheckCircle2 },
];

function getStageIndex(stage: FusionStage): number {
  const idx = STAGES.findIndex((s) => s.key === stage);
  return idx >= 0 ? idx : -1;
}

export default function StageIndicator({ stage }: StageIndicatorProps) {
  const currentIndex = getStageIndex(stage);

  if (stage === "idle" || stage === "error") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-between relative">
          {/* Progress line */}
          <div className="absolute top-5 left-0 right-0 h-[2px] bg-gray-800">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              initial={{ width: "0%" }}
              animate={{
                width: `${(currentIndex / (STAGES.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          {STAGES.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === currentIndex;
            const isComplete = i < currentIndex;
            const isPending = i > currentIndex;

            return (
              <div key={s.key} className="relative flex flex-col items-center z-10">
                <motion.div
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    backgroundColor: isComplete
                      ? "rgb(99, 102, 241)"
                      : isActive
                      ? "rgb(168, 85, 247)"
                      : "rgb(31, 41, 55)",
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isPending ? "text-gray-600" : "text-white"
                    }`}
                  />
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-purple-400"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>
                <span
                  className={`mt-2 text-xs ${
                    isActive
                      ? "text-purple-400 font-medium"
                      : isComplete
                      ? "text-indigo-400"
                      : "text-gray-600"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
