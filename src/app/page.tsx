"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Atom, ArrowRight } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import Header from "@/components/Header";
import FusionInput from "@/components/FusionInput";
import FusionButton from "@/components/FusionButton";
import FusionReactorLoader from "@/components/FusionReactorLoader";
import ResultsDisplay from "@/components/ResultsDisplay";
import ExamplePairs from "@/components/ExamplePairs";
import type { FusionStage } from "@/lib/types";

function detectStage(text: string): FusionStage {
  const lower = text.toLowerCase();
  if (/fusion score/i.test(lower) || /\/100/i.test(lower)) return "complete";
  if (/breakthrough/i.test(lower) || /discovery/i.test(lower)) return "breakthrough";
  if (/novel insight/i.test(lower)) return "synthesizing";
  if (/structural mapping/i.test(lower) || /mapping \d/i.test(lower)) return "mapping";
  if (/decomposition/i.test(lower)) return "decomposing";
  return "decomposing";
}

export default function Home() {
  const [conceptA, setConceptA] = useState("");
  const [conceptB, setConceptB] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState<FusionStage>("idle");
  const [streamedContent, setStreamedContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleFusion = useCallback(async () => {
    if (!conceptA.trim() || !conceptB.trim()) return;

    setIsLoading(true);
    setStage("decomposing");
    setStreamedContent("");
    setError(null);

    // Scroll to results area
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);

    try {
      const response = await fetch("/api/fusion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conceptA: conceptA.trim(), conceptB: conceptB.trim() }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errData.error || `HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setStreamedContent(fullText);
        setStage(detectStage(fullText));
      }

      setStage("complete");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setStage("error");
    } finally {
      setIsLoading(false);
    }
  }, [conceptA, conceptB]);

  const handleExampleSelect = useCallback((a: string, b: string) => {
    setConceptA(a);
    setConceptB(b);
  }, []);

  const canFuse = conceptA.trim().length > 0 && conceptB.trim().length > 0 && !isLoading;

  return (
    <main className="relative min-h-screen grid-bg">
      <ParticleBackground />
      <Header />

      {/* Hero Section */}
      <section className="relative z-10 pt-28 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Reactor icon */}
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full glass mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Atom className="w-10 h-10 text-indigo-400" strokeWidth={1} />
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="gradient-text">Fuse Any Two Ideas.</span>
              <br />
              <span className="text-white/90">Discover What Nobody Has.</span>
            </h1>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed">
              Throw in two completely unrelated concepts. GENESIS discovers
              hidden <span className="text-indigo-400">structural isomorphisms</span> —
              identical patterns operating across different domains that reveal
              genuinely novel insights.
            </p>

            <p className="text-sm text-gray-600 flex items-center justify-center gap-2 mb-12">
              Not metaphors. Not analogies. <span className="text-purple-400 font-medium">Mathematical structures.</span>
              <ArrowRight className="w-3 h-3 text-gray-600" />
              <span className="text-pink-400 font-medium">Novel discoveries.</span>
            </p>
          </motion.div>

          {/* Input Fields */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-3xl mx-auto">
            <FusionInput
              label="Concept A"
              value={conceptA}
              onChange={setConceptA}
              placeholder="Quantum Entanglement"
              side="left"
              disabled={isLoading}
            />

            {/* Fusion connector */}
            <div className="flex items-end justify-center pb-3">
              <motion.div
                animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
                transition={isLoading ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}
                className="w-10 h-10 rounded-full glass flex items-center justify-center"
              >
                <span className="text-lg gradient-text font-bold">×</span>
              </motion.div>
            </div>

            <FusionInput
              label="Concept B"
              value={conceptB}
              onChange={setConceptB}
              placeholder="Jazz Improvisation"
              side="right"
              disabled={isLoading}
            />
          </div>

          {/* Fusion Button */}
          <div className="mb-8">
            <FusionButton
              onClick={handleFusion}
              disabled={!canFuse}
              isLoading={isLoading}
            />
          </div>

          {/* Example Pairs */}
          {stage === "idle" && (
            <ExamplePairs onSelect={handleExampleSelect} disabled={isLoading} />
          )}
        </div>
      </section>

      {/* Stage Indicator */}
      {stage !== "idle" && stage !== "complete" && (
        <section className="relative z-10 px-6 pb-8">
          <FusionReactorLoader stage={stage} />
        </section>
      )}

      {/* Error Display */}
      {error && (
        <section className="relative z-10 px-6 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="glass rounded-2xl p-6 border border-red-500/20">
              <p className="text-red-400 text-sm mb-2">Fusion Reactor Error</p>
              <p className="text-gray-400 text-sm">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setStage("idle");
                }}
                className="mt-4 px-4 py-2 rounded-lg text-sm glass hover:bg-white/[0.06] transition-colors text-white"
              >
                Reset Reactor
              </button>
            </div>
          </motion.div>
        </section>
      )}

      {/* Results Display */}
      <section ref={resultsRef} className="relative z-10 px-6 pb-20">
        <ResultsDisplay content={streamedContent} isStreaming={isLoading} />
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-xs text-gray-700">
        <p>GENESIS — Cross-Domain Structural Analogy Engine</p>
        <p className="mt-1">Discovering impossible connections since 2026</p>
      </footer>
    </main>
  );
}
