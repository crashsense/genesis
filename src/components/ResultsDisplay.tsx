"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Star, Zap, Lightbulb, Microscope, Link2, BarChart3 } from "lucide-react";
import { useState, useMemo } from "react";
import InsightCard from "./InsightCard";

interface ResultsDisplayProps {
  content: string;
  isStreaming: boolean;
}

/** Strip common emojis from section titles for pure-styled UI */
function stripEmoji(text: string): string {
  return text
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F000}-\u{1FFFF}]/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

interface ParsedSection {
  type: "decompositionA" | "decompositionB" | "mappings" | "insights" | "breakthrough" | "score" | "unknown";
  title: string;
  content: string;
}

function parseSections(markdown: string): ParsedSection[] {
  const sections: ParsedSection[] = [];
  const lines = markdown.split("\n");
  let currentSection: ParsedSection | null = null;

  for (const line of lines) {
    // Detect section headers
    if (line.startsWith("### ") || line.startsWith("## ")) {
      if (currentSection) {
        sections.push(currentSection);
      }

      const headerText = line.replace(/^#{2,3}\s*/, "").trim();
      let type: ParsedSection["type"] = "unknown";

      if (/decomposition/i.test(headerText) && sections.filter(s => s.type.startsWith("decomposition")).length === 0) {
        type = "decompositionA";
      } else if (/decomposition/i.test(headerText)) {
        type = "decompositionB";
      } else if (/mapping/i.test(headerText)) {
        type = "mappings";
      } else if (/insight/i.test(headerText)) {
        type = "insights";
      } else if (/breakthrough/i.test(headerText) || /discovery/i.test(headerText)) {
        type = "breakthrough";
      } else if (/score/i.test(headerText) || /fusion score/i.test(headerText)) {
        type = "score";
      }

      currentSection = { type, title: headerText, content: "" };
    } else if (currentSection) {
      currentSection.content += line + "\n";
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

function parseInsights(content: string) {
  const insights: { title: string; category?: string; description: string; noveltyScore?: number; prediction?: string; application?: string }[] = [];

  const blocks = content.split(/\*\*Insight \d+:/);

  for (const block of blocks) {
    if (!block.trim()) continue;

    const titleMatch = block.match(/^([^*\n]+)\*\*/);
    const title = titleMatch ? titleMatch[1].trim() : "Insight";

    const categoryMatch = block.match(/\*\*Category\*\*:\s*(.+)/i);
    const descMatch = block.match(/\*\*Description\*\*:\s*(.+)/i);
    const noveltyMatch = block.match(/\*\*Novelty Score\*\*:\s*(\d+)/i);
    const predMatch = block.match(/\*\*Prediction\*\*:\s*(.+)/i);
    const appMatch = block.match(/\*\*Application\*\*:\s*(.+)/i);

    if (title) {
      insights.push({
        title,
        category: categoryMatch?.[1]?.trim(),
        description: descMatch?.[1]?.trim() || block.slice(0, 200).trim(),
        noveltyScore: noveltyMatch ? parseInt(noveltyMatch[1]) : undefined,
        prediction: predMatch?.[1]?.trim(),
        application: appMatch?.[1]?.trim(),
      });
    }
  }

  return insights;
}

function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  accent = "indigo",
  icon: Icon,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  accent?: "indigo" | "purple" | "pink";
  icon?: React.ElementType;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const cleanTitle = stripEmoji(title);

  const colorMap = {
    indigo: "text-indigo-400 border-indigo-500/20",
    purple: "text-purple-400 border-purple-500/20",
    pink: "text-pink-400 border-pink-500/20",
  };

  const iconBgMap = {
    indigo: "bg-indigo-500/10 border-indigo-500/20",
    purple: "bg-purple-500/10 border-purple-500/20",
    pink: "bg-pink-500/10 border-pink-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-6 py-4 flex items-center justify-between ${colorMap[accent]} hover:bg-white/[0.02] transition-colors`}
      >
        <span className="flex items-center gap-2.5 font-medium text-sm">
          {Icon && (
            <span className={`w-6 h-6 rounded-md flex items-center justify-center border ${iconBgMap[accent]}`}>
              <Icon className="w-3.5 h-3.5" />
            </span>
          )}
          {cleanTitle}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-sm text-gray-300 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MarkdownContent({ text }: { text: string }) {
  // Simple markdown-to-JSX rendering
  const lines = text.trim().split("\n");

  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-2" />;

        // Bold text
        const rendered = trimmed.replace(
          /\*\*(.+?)\*\*/g,
          '<strong class="text-white font-medium">$1</strong>'
        );

        // List items
        if (trimmed.startsWith("- ")) {
          return (
            <div key={i} className="flex gap-2 pl-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span dangerouslySetInnerHTML={{ __html: rendered.slice(2) }} />
            </div>
          );
        }

        // Sub-headers
        if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
          return (
            <h5 key={i} className="text-white font-medium mt-3 mb-1">
              {trimmed.replace(/\*\*/g, "")}
            </h5>
          );
        }

        return (
          <p key={i} dangerouslySetInnerHTML={{ __html: rendered }} />
        );
      })}
    </div>
  );
}

function FusionScoreDisplay({ content }: { content: string }) {
  const scoreMatch = content.match(/(\d+)\s*\/\s*100/);
  const score = scoreMatch ? parseInt(scoreMatch[1]) : null;

  if (!score) return <MarkdownContent text={content} />;

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="text-center py-8"
    >
      <div className="relative inline-block">
        <div className="text-7xl font-bold gradient-text glow-text">
          {score}
        </div>
        <div className="text-lg text-gray-400 mt-1">/100</div>
        <div className="absolute -inset-6 rounded-full reactor-core opacity-20 animate-fusion-pulse" />
      </div>
      <div className="mt-4 max-w-md mx-auto">
        <MarkdownContent text={content.replace(/(\d+)\s*\/\s*100/, "").trim()} />
      </div>
    </motion.div>
  );
}

export default function ResultsDisplay({ content, isStreaming }: ResultsDisplayProps) {
  const sections = useMemo(() => parseSections(content), [content]);

  if (!content && !isStreaming) return null;

  // While still getting initial content, show nothing (reactor loader handles this)
  if (isStreaming && sections.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto space-y-4"
    >
      {sections.map((section, i) => {
        switch (section.type) {
          case "decompositionA":
          case "decompositionB":
            return (
              <CollapsibleSection
                key={i}
                title={section.title}
                accent={section.type === "decompositionA" ? "indigo" : "purple"}
                icon={Microscope}
              >
                <MarkdownContent text={section.content} />
              </CollapsibleSection>
            );

          case "mappings":
            return (
              <CollapsibleSection key={i} title={section.title} defaultOpen accent="purple" icon={Link2}>
                <MarkdownContent text={section.content} />
              </CollapsibleSection>
            );

          case "insights": {
            const insights = parseInsights(section.content);
            return (
              <div key={i} className="space-y-3">
                <h3 className="flex items-center gap-2.5 text-lg font-semibold text-purple-400 px-2">
                  <span className="w-7 h-7 rounded-md flex items-center justify-center bg-purple-500/10 border border-purple-500/20">
                    <Lightbulb className="w-4 h-4" />
                  </span>
                  {stripEmoji(section.title)}
                </h3>
                {insights.length > 0 ? (
                  <div className="grid gap-3 md:grid-cols-2">
                    {insights.map((insight, j) => (
                      <InsightCard key={j} {...insight} index={j} />
                    ))}
                  </div>
                ) : (
                  <CollapsibleSection title={section.title} defaultOpen accent="purple" icon={Lightbulb}>
                    <MarkdownContent text={section.content} />
                  </CollapsibleSection>
                )}
              </div>
            );
          }

          case "breakthrough":
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl overflow-hidden"
              >
                {/* Dramatic gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 rounded-2xl" />
                <div className="relative glass-strong rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold gradient-text">
                      {stripEmoji(section.title)}
                    </h3>
                  </div>
                  <MarkdownContent text={section.content} />
                </div>
              </motion.div>
            );

          case "score":
            return (
              <div key={i} className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-7 h-7 rounded-md flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
                    <BarChart3 className="w-4 h-4 text-yellow-400" />
                  </span>
                  <h3 className="text-lg font-semibold text-yellow-400">
                    {stripEmoji(section.title)}
                  </h3>
                </div>
                <FusionScoreDisplay content={section.content} />
              </div>
            );

          default:
            return section.content.trim() ? (
              <CollapsibleSection key={i} title={section.title} defaultOpen accent="indigo">
                <MarkdownContent text={section.content} />
              </CollapsibleSection>
            ) : null;
        }
      })}

      {isStreaming && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-3 py-6"
        >
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full bg-gradient-to-t from-indigo-500 to-purple-400"
                animate={{
                  height: [8, 20, 8],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.12,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          <motion.span
            className="text-sm text-gray-500"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Reactor generating output
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ...
            </motion.span>
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
}
