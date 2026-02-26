"use client";

import { motion } from "framer-motion";
import { Lightbulb, FlaskConical, Compass, LayoutGrid, AlertTriangle } from "lucide-react";

interface InsightCardProps {
  title: string;
  category?: string;
  description: string;
  noveltyScore?: number;
  prediction?: string;
  application?: string;
  index: number;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  principle: Compass,
  mechanism: FlaskConical,
  strategy: Lightbulb,
  framework: LayoutGrid,
  paradox: AlertTriangle,
};

function getNoveltyColor(score: number): string {
  if (score >= 80) return "from-pink-500 to-red-500";
  if (score >= 60) return "from-purple-500 to-pink-500";
  if (score >= 40) return "from-indigo-500 to-purple-500";
  return "from-blue-500 to-indigo-500";
}

function getNoveltyLabel(score: number): string {
  if (score >= 90) return "Unprecedented";
  if (score >= 75) return "Highly Novel";
  if (score >= 60) return "Novel";
  if (score >= 40) return "Interesting";
  return "Incremental";
}

export default function InsightCard({
  title,
  category,
  description,
  noveltyScore,
  prediction,
  application,
  index,
}: InsightCardProps) {
  const Icon = (category && CATEGORY_ICONS[category.toLowerCase()]) || Lightbulb;
  const score = noveltyScore ?? 50;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="insight-card glass rounded-2xl p-6 relative overflow-hidden"
    >
      {/* Subtle glow top-left */}
      <div
        className="absolute -top-10 -left-10 w-32 h-32 rounded-full opacity-10"
        style={{
          background: `radial-gradient(circle, ${
            score >= 70 ? "rgba(236,72,153,0.5)" : "rgba(99,102,241,0.5)"
          }, transparent)`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <Icon className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">{title}</h4>
              {category && (
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                  {category}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 leading-relaxed mb-4">
          {description}
        </p>

        {/* Novelty Score Bar */}
        {noveltyScore !== undefined && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Novelty</span>
              <span className="text-xs font-mono text-gray-400">
                {score}/100 · {getNoveltyLabel(score)}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                className={`h-full rounded-full bg-gradient-to-r ${getNoveltyColor(score)}`}
              />
            </div>
          </div>
        )}

        {/* Prediction & Application */}
        {prediction && (
          <div className="mb-2">
            <span className="text-xs text-indigo-400 font-medium">Prediction: </span>
            <span className="text-xs text-gray-400">{prediction}</span>
          </div>
        )}
        {application && (
          <div>
            <span className="text-xs text-pink-400 font-medium">Application: </span>
            <span className="text-xs text-gray-400">{application}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
