export interface FusionRequest {
  conceptA: string;
  conceptB: string;
}

export interface StructuralMapping {
  patternName: string;
  domainA: string;
  domainB: string;
  description: string;
  confidence: number; // 0-1
}

export interface NovelInsight {
  title: string;
  description: string;
  noveltyScore: number; // 0-100
  applicability: string;
  category: "principle" | "mechanism" | "strategy" | "framework" | "paradox";
}

export interface FusionResult {
  // Phase 1: Decomposition
  conceptAAnalysis: {
    corePrinciples: string[];
    mechanisms: string[];
    patterns: string[];
    metaphors: string[];
  };
  conceptBAnalysis: {
    corePrinciples: string[];
    mechanisms: string[];
    patterns: string[];
    metaphors: string[];
  };

  // Phase 2: Structural Mapping
  structuralMappings: StructuralMapping[];

  // Phase 3: Fusion Synthesis
  novelInsights: NovelInsight[];

  // Phase 4: Revolutionary Discovery
  breakthroughIdea: {
    title: string;
    thesis: string;
    evidence: string[];
    implications: string[];
    actionableSteps: string[];
  };

  // Meta
  fusionScore: number; // 0-100 overall novelty
  processingStages: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  group: "conceptA" | "conceptB" | "bridge" | "insight";
  x: number;
  y: number;
  size: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  strength: number; // 0-1
  label?: string;
}

export type FusionStage =
  | "idle"
  | "decomposing"
  | "mapping"
  | "synthesizing"
  | "breakthrough"
  | "complete"
  | "error";

export interface FusionState {
  stage: FusionStage;
  progress: number; // 0-100
  currentAction: string;
  result: Partial<FusionResult> | null;
  error: string | null;
}
