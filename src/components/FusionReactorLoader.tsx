"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, GitBranch, Lightbulb, Sparkles, CheckCircle2 } from "lucide-react";
import type { FusionStage } from "@/lib/types";

interface FusionReactorLoaderProps {
  stage: FusionStage;
}

const STAGE_CONFIG: Record<
  string,
  { label: string; description: string; icon: React.ElementType; color: string }
> = {
  decomposing: {
    label: "Decomposing",
    description: "Breaking down structural DNA of each concept...",
    icon: Search,
    color: "#6366f1",
  },
  mapping: {
    label: "Mapping",
    description: "Searching for hidden bridges between domains...",
    icon: GitBranch,
    color: "#a855f7",
  },
  synthesizing: {
    label: "Synthesizing",
    description: "Forging novel cross-domain connections...",
    icon: Lightbulb,
    color: "#ec4899",
  },
  breakthrough: {
    label: "Breakthrough",
    description: "Eureka moment incoming...",
    icon: Sparkles,
    color: "#f59e0b",
  },
  complete: {
    label: "Complete",
    description: "Fusion reactor output ready",
    icon: CheckCircle2,
    color: "#10b981",
  },
};

const STAGES_ORDER: FusionStage[] = [
  "decomposing",
  "mapping",
  "synthesizing",
  "breakthrough",
  "complete",
];

function getStageIndex(stage: FusionStage): number {
  return STAGES_ORDER.indexOf(stage);
}

/** Orbiting particle around the reactor core */
function OrbitalRing({
  radius,
  duration,
  delay,
  color,
  thickness = 1,
}: {
  radius: number;
  duration: number;
  delay: number;
  color: string;
  thickness?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: radius * 2,
        height: radius * 2,
        left: `calc(50% - ${radius}px)`,
        top: `calc(50% - ${radius}px)`,
        border: `${thickness}px solid transparent`,
        borderTopColor: color,
        borderRightColor: `${color}44`,
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    />
  );
}

/** Glowing particle that orbits the core */
function OrbitingParticle({
  radius,
  duration,
  size,
  color,
  delay = 0,
}: {
  radius: number;
  duration: number;
  size: number;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{
        width: size,
        height: size,
        left: `calc(50% - ${size / 2}px)`,
        top: `calc(50% - ${size / 2}px)`,
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    >
      <motion.div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}66`,
          transform: `translateX(${radius}px)`,
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

/** Energy arc connecting to center */
function EnergyArc({ index, total }: { index: number; total: number }) {
  const angle = (index / total) * 360;
  return (
    <motion.div
      className="absolute inset-0"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <motion.div
        className="absolute left-1/2 top-0 w-[1px] origin-bottom"
        style={{
          height: "50%",
          background:
            "linear-gradient(to top, rgba(99, 102, 241, 0.6), transparent)",
        }}
        animate={{
          opacity: [0, 0.8, 0],
          scaleY: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 1.5 + index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2,
        }}
      />
    </motion.div>
  );
}

export default function FusionReactorLoader({
  stage,
}: FusionReactorLoaderProps) {
  if (stage === "idle" || stage === "error") return null;

  const currentIndex = getStageIndex(stage);
  const config = STAGE_CONFIG[stage] || STAGE_CONFIG.decomposing;
  const Icon = config.icon;
  const progress = ((currentIndex + 1) / STAGES_ORDER.length) * 100;
  const isComplete = stage === "complete";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="flex flex-col items-center gap-6">
        {/* === REACTOR CORE === */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56">
          {/* Background glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${config.color}20 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Orbital rings */}
          <OrbitalRing
            radius={90}
            duration={8}
            delay={0}
            color={`${config.color}88`}
            thickness={1}
          />
          <OrbitalRing
            radius={75}
            duration={6}
            delay={0.5}
            color="#a855f788"
            thickness={1}
          />
          <OrbitalRing
            radius={60}
            duration={4}
            delay={1}
            color="#ec489988"
            thickness={1}
          />

          {/* Orbiting particles */}
          <OrbitingParticle
            radius={88}
            duration={7}
            size={4}
            color="#6366f1"
            delay={0}
          />
          <OrbitingParticle
            radius={73}
            duration={5}
            size={3}
            color="#a855f7"
            delay={1}
          />
          <OrbitingParticle
            radius={58}
            duration={3.5}
            size={3}
            color="#ec4899"
            delay={0.5}
          />
          <OrbitingParticle
            radius={88}
            duration={9}
            size={2}
            color="#06b6d4"
            delay={2}
          />

          {/* Energy arcs */}
          {!isComplete &&
            Array.from({ length: 6 }).map((_, i) => (
              <EnergyArc key={i} index={i} total={6} />
            ))}

          {/* Inner core glow */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 80,
              height: 80,
              left: "calc(50% - 40px)",
              top: "calc(50% - 40px)",
              background: `radial-gradient(circle, ${config.color}44 0%, ${config.color}11 60%, transparent 100%)`,
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, rotate: 180, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${config.color}33, ${config.color}11)`,
                  border: `1px solid ${config.color}44`,
                  boxShadow: `0 0 30px ${config.color}33, inset 0 0 20px ${config.color}11`,
                }}
              >
                <Icon
                  className="w-6 h-6 sm:w-7 sm:h-7"
                  style={{ color: config.color }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Completion burst */}
          {isComplete && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid #10b981",
              }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.5, opacity: [0, 0.8, 0] }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          )}
        </div>

        {/* === STAGE INFO === */}
        <div className="text-center space-y-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em] inline-block px-3 py-1 rounded-full"
                style={{
                  color: config.color,
                  backgroundColor: `${config.color}15`,
                  border: `1px solid ${config.color}30`,
                }}
              >
                {config.label}
              </span>
              <p className="text-sm text-gray-400 mt-2">
                {config.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar */}
          <div className="w-64 sm:w-80 mx-auto">
            <div className="h-[3px] bg-gray-800/60 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full relative"
                style={{
                  background: `linear-gradient(90deg, #6366f1, ${config.color})`,
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {/* Shimmer on progress bar */}
                {!isComplete && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                      backgroundSize: "200% 100%",
                    }}
                    animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </motion.div>
            </div>

            {/* Stage dots */}
            <div className="flex justify-between mt-2 px-0.5">
              {STAGES_ORDER.map((s, i) => {
                const isDone = i < currentIndex;
                const isCurrent = i === currentIndex;
                const dotConfig = STAGE_CONFIG[s];
                return (
                  <motion.div
                    key={s}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: isDone
                        ? dotConfig.color
                        : isCurrent
                          ? config.color
                          : "#1f2937",
                    }}
                    animate={
                      isCurrent
                        ? {
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7],
                          }
                        : {}
                    }
                    transition={
                      isCurrent
                        ? { duration: 1.5, repeat: Infinity }
                        : undefined
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
