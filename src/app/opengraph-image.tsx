import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "GENESIS — Idea Fusion Reactor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #030014 0%, #0f0529 40%, #030014 100%)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(99, 102, 241, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Glow orb — top left */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Glow orb — bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Reactor core visualization */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: 160,
            height: 160,
            marginBottom: 24,
          }}
        >
          {/* Outer ring */}
          <div
            style={{
              position: "absolute",
              width: 160,
              height: 160,
              borderRadius: "50%",
              border: "2px solid rgba(99, 102, 241, 0.3)",
              display: "flex",
            }}
          />

          {/* Middle ring */}
          <div
            style={{
              position: "absolute",
              width: 120,
              height: 120,
              borderRadius: "50%",
              border: "1.5px solid rgba(168, 85, 247, 0.35)",
              display: "flex",
            }}
          />

          {/* Inner ring */}
          <div
            style={{
              position: "absolute",
              width: 80,
              height: 80,
              borderRadius: "50%",
              border: "1px solid rgba(236, 72, 153, 0.3)",
              display: "flex",
            }}
          />

          {/* Core gradient */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(168, 85, 247, 0.4), 0 0 80px rgba(99, 102, 241, 0.2)",
            }}
          >
            <span
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.02em",
              }}
            >
              G
            </span>
          </div>

          {/* Orbiting particles */}
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 18,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#6366f1",
              boxShadow: "0 0 12px #6366f1",
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: 10,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#a855f7",
              boxShadow: "0 0 10px #a855f7",
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 5,
              right: 30,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#ec4899",
              boxShadow: "0 0 8px #ec4899",
              display: "flex",
            }}
          />
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              color: "rgba(168, 85, 247, 0.8)",
            }}
          >
            The Idea Fusion Reactor
          </span>

          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
              backgroundClip: "text",
              color: "transparent",
              lineHeight: 1.1,
            }}
          >
            GENESIS
          </span>
        </div>

        {/* Tagline */}
        <span
          style={{
            fontSize: 22,
            color: "rgba(226, 232, 240, 0.7)",
            marginTop: 16,
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          Fuse Any Two Ideas. Discover What Nobody Has.
        </span>

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 28,
          }}
        >
          {["Structural Isomorphisms", "Cross-Domain Mapping", "AI-Powered Discovery"].map(
            (label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  borderRadius: 20,
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  fontSize: 13,
                  color: "rgba(226, 232, 240, 0.5)",
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            )
          )}
        </div>

        {/* Bottom URL */}
        <span
          style={{
            position: "absolute",
            bottom: 24,
            fontSize: 13,
            color: "rgba(226, 232, 240, 0.25)",
            letterSpacing: "0.05em",
          }}
        >
          genesis-app.vercel.app
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
