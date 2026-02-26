<div align="center">

```
  ╔═══════════════════════════════════════════════════════════════╗
  ║                                                               ║
  ║    ██████╗ ███████╗███╗   ██╗███████╗███████╗██╗███████╗     ║
  ║   ██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔════╝██║██╔════╝     ║
  ║   ██║  ███╗█████╗  ██╔██╗ ██║█████╗  ███████╗██║███████╗     ║
  ║   ██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ╚════██║██║╚════██║     ║
  ║   ╚██████╔╝███████╗██║ ╚████║███████╗███████║██║███████║     ║
  ║    ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝╚══════╝     ║
  ║                                                               ║
  ║              T H E   I D E A   F U S I O N   R E A C T O R   ║
  ║                                                               ║
  ╚═══════════════════════════════════════════════════════════════╝
```

**Fuse Any Two Ideas. Discover What Nobody Has.**

*A cross-domain structural analogy engine that finds hidden mathematical patterns between completely unrelated concepts — not metaphors, not analogies, but genuine structural isomorphisms that reveal novel insights no human has articulated before.*

<!-- screenshot -->
<!-- Add a screenshot or GIF demo of GENESIS in action here -->

---

</div>

## The Problem With "AI Brainstorming"

Every AI tool on the market does the same thing: you give it a topic, it generates surface-level ideas. "What if we combined X and Y?" produces responses like *"Both involve patterns"* or *"They share a theme of balance."* Worthless.

**GENESIS operates at a fundamentally different level.**

When a biologist says "survival of the fittest" and an economist says "market competition," a surface-level thinker says "they're both about competition." A structural thinker sees: both are instances of **evolutionary game theory with frequency-dependent selection** — and THAT structural insight reveals that anti-trust regulation is analogous to biodiversity preservation, *and for the same mathematical reasons.*

GENESIS finds those connections. Automatically. Between any two concepts you throw at it.

## How It Works

GENESIS runs a **4-stage structural analysis pipeline** on every fusion:

```
  DECOMPOSE          MAP              SYNTHESIZE         DISCOVER
 ┌──────────┐    ┌──────────┐      ┌──────────┐      ┌──────────┐
 │ Break     │    │ Find     │      │ Generate │      │ One      │
 │ each      │───>│ shared   │─────>│ novel    │─────>│ break-   │
 │ concept   │    │ math     │      │ insights │      │ through  │
 │ into      │    │ patterns │      │ neither  │      │ idea     │
 │ structural│    │ across   │      │ field    │      │ that     │
 │ elements  │    │ domains  │      │ has seen │      │ could    │
 └──────────┘    └──────────┘      └──────────┘      │ only     │
                                                      │ emerge   │
                                                      │ from     │
                                                      │ fusion   │
                                                      └──────────┘
```

**Stage 1 — Decomposition:** Each concept is broken into core principles, key mechanisms, emergent patterns, and hidden assumptions. Not descriptions — *structural DNA.*

**Stage 2 — Structural Mapping:** The engine identifies isomorphisms across domains: shared topology, information-theoretic patterns, game-theoretic dynamics, network properties, phase transitions, and feedback loop structures. Each mapping includes a confidence score based on structural depth, not surface similarity.

**Stage 3 — Novel Insights:** From the mappings, GENESIS synthesizes insights that neither domain has discovered independently. Each must be non-obvious (a domain expert would say "I never thought of it that way"), testable (suggests a concrete prediction), and actionable (has practical applications).

**Stage 4 — Breakthrough Discovery:** The crown jewel — one revolutionary idea that could *only* emerge from this specific fusion. Written with the clarity and conviction of a Nature paper abstract.

Every fusion concludes with a **Fusion Score** (0-100) rating the structural depth, novelty, and actionability of the results.

## Example Fusions

| Concept A | Concept B | What GENESIS Reveals |
|---|---|---|
| **Quantum Entanglement** | **Jazz Improvisation** | Non-local correlation structures in both — how musicians maintain coherent group improvisation mirrors quantum state synchronization without direct communication |
| **Black Hole Physics** | **Corporate Bankruptcy** | Information paradox parallels — both involve irreversible compression events where apparently lost information reshapes surrounding systems |
| **CRISPR Gene Editing** | **Constitutional Law** | Both are precision modification systems for inherited codebases with off-target effects, version control problems, and germline vs. somatic change debates |
| **Mycelium Networks** | **Internet Architecture** | Scale-free network topology, distributed resource allocation, and resilience through redundancy — mycorrhizal nutrient markets parallel BGP routing |
| **Plate Tectonics** | **Social Revolutions** | Stress accumulation and sudden phase transitions — both follow power-law distributions of pressure release after periods of locked-in stability |

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **UI** | React 19, Tailwind CSS v4 |
| **Animation** | Framer Motion 12 |
| **AI** | OpenAI-compatible streaming API (configurable backend) |
| **Icons** | Lucide React |
| **Validation** | Zod 4 |
| **Deployment** | Vercel (multi-region) |

**Design:** Dark sci-fi aesthetic — particle backgrounds, glassmorphism panels, reactor-style loading animation with orbiting particles, real-time streaming text with stage detection.

## Getting Started

### Prerequisites

- Node.js 18+
- An OpenAI-compatible API endpoint (OpenAI, Azure, or any compatible proxy)

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/genesis.git
cd genesis

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
```

Edit `.env.local` with your API credentials:

```env
LLM_TOKEN=your-api-key
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4o
```

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — enter two concepts and hit **Initiate Fusion**.

## Environment Variables

| Variable | Required | Description | Default |
|---|---|---|---|
| `LLM_TOKEN` | Yes | API key for your LLM provider | — |
| `LLM_BASE_URL` | Yes | Base URL for OpenAI-compatible API | `https://api.openai.com/v1` |
| `LLM_MODEL` | No | Model identifier | `gpt-4o` |

> **Note:** GENESIS uses `LLM_TOKEN` instead of `OPENAI_API_KEY` because Next.js 16 automatically redacts environment variables containing "KEY" in the name. This is intentional.

## Deployment

GENESIS is optimized for **Vercel** with multi-region edge deployment:

```bash
# Deploy to Vercel
npx vercel

# Or connect your GitHub repo for automatic deployments
```

The included `vercel.json` configures:
- **5 global regions** — US East, US West, Tokyo, Paris, Singapore
- **60-second function timeout** for the fusion API route
- **Security headers** — nosniff, DENY framing, XSS protection, strict referrer policy

Set the same environment variables in your Vercel project settings.

## Architecture

```
genesis/
├── src/
│   ├── app/
│   │   ├── api/fusion/
│   │   │   └── route.ts          # Streaming API — raw fetch to LLM proxy
│   │   ├── page.tsx              # Main page — state management, streaming
│   │   ├── layout.tsx            # Root layout, metadata, fonts
│   │   └── globals.css           # Animations, glassmorphism, grid background
│   ├── components/
│   │   ├── FusionReactorLoader   # Reactor visualization during analysis
│   │   ├── ParticleBackground    # Canvas particle animation
│   │   ├── Header                # Slim navigation bar
│   │   ├── FusionInput           # Concept input fields
│   │   ├── FusionButton          # Reactor-style submit button
│   │   ├── ResultsDisplay        # Streaming markdown parser + renderer
│   │   ├── InsightCard           # Individual insight cards with novelty meter
│   │   └── ExamplePairs          # Preset concept pair suggestions
│   └── lib/
│       ├── prompts.ts            # 600+ word system prompt for structural analysis
│       └── types.ts              # TypeScript interfaces
├── vercel.json                   # Multi-region deployment config
└── package.json
```

**Key design decisions:**
- **Raw `fetch()` over AI SDK** — Bypasses SDK auth quirks and endpoint assumptions. Direct SSE stream parsing via `TransformStream`.
- **Stage detection from content** — The UI detects which analysis phase the AI is in by pattern-matching the streaming text, driving the reactor animation.
- **No database** — Stateless by design. Every fusion is ephemeral. Your ideas, your privacy.

## The System Prompt

The core of GENESIS is a **600+ word system prompt** that transforms a general-purpose LLM into a structural analogy engine. It forces the AI to:

1. **Decompose** concepts into mechanisms, not descriptions
2. **Map** using formal structures — topology, game theory, information theory, network science
3. **Reject surface metaphors** — "Both involve balance" is explicitly banned
4. **Quantify confidence** — Every mapping gets a structural depth score
5. **Generate testable predictions** — Every insight must suggest a concrete experiment
6. **Surprise domain experts** — The benchmark is an expert raising an eyebrow

This prompt is the result of extensive iteration. It works best with capable reasoning models (GPT-4o+, Claude Sonnet, Gemini Pro).

---

<div align="center">

**GENESIS** — Discovering impossible connections since 2026.

*Built with conviction that the most powerful ideas live at the intersection of domains nobody thought to connect.*

MIT License

</div>
