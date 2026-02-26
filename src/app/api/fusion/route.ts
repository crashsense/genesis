import { FUSION_SYSTEM_PROMPT } from "@/lib/prompts";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { conceptA, conceptB } = (await req.json()) as {
      conceptA: string;
      conceptB: string;
    };

    if (!conceptA?.trim() || !conceptB?.trim()) {
      return new Response(
        JSON.stringify({ error: "Both concepts are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiToken = process.env.LLM_TOKEN || process.env.OPENAI_API_KEY || "";
    const baseURL = process.env.LLM_BASE_URL || process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
    const model = process.env.LLM_MODEL || process.env.OPENAI_MODEL || "gpt-4o";

    const upstream = await fetch(`${baseURL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: FUSION_SYSTEM_PROMPT },
          {
            role: "user",
            content: `Initiate GENESIS fusion between these two concepts:\n\n**Concept A:** ${conceptA.trim()}\n**Concept B:** ${conceptB.trim()}\n\nPerform the full structural analysis pipeline. Be brilliant. Be specific. Discover what nobody has seen before.`,
          },
        ],
        temperature: 0.85,
        max_tokens: 4000,
        stream: true,
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      console.error("Upstream API error:", upstream.status, errText, "Headers sent:", JSON.stringify(Object.fromEntries(upstream.headers.entries())));
      return new Response(
        JSON.stringify({ error: "Fusion reactor upstream error." }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    // Transform SSE stream to plain text stream
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const transformStream = new TransformStream({
      transform(chunk, controller) {
        const text = decoder.decode(chunk, { stream: true });
        const lines = text.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") return;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                controller.enqueue(encoder.encode(content));
              }
            } catch {
              // Skip non-JSON lines
            }
          }
        }
      },
    });

    const readable = upstream.body?.pipeThrough(transformStream);

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Fusion API error:", error);
    return new Response(
      JSON.stringify({ error: "Fusion reactor malfunction. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
