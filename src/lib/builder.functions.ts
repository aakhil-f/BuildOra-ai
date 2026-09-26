import { createServerFn } from "@tanstack/react-start";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayRunIdFetch } from "./ai-gateway.server";

const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        from: z.enum(["user", "ai"]),
        text: z.string().min(1),
      }),
    )
    .min(1),
});

const SYSTEM_PROMPT = `You are Buildora AI, an AI that designs and builds websites for small businesses through natural conversation.

Rules:
- Never interrogate the user with a long questionnaire. Ask at most one short clarifying question, and only when essential.
- When the user describes a business or a change, respond as if you just built or updated their website: briefly state the direction, the pages/sections you created or changed, and one suggestion for what to refine next.
- Keep replies warm, confident and short: 2-4 sentences, plain language, no technical jargon, no markdown headings or code.
- Currency is Indian Rupees when prices are relevant.`;

export const sendBuilderMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const runIdFetch = createLovableAiGatewayRunIdFetch();
    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: runIdFetch.fetch,
    });

    const result = streamText({
      model: lovable.responses("openai/gpt-6-astra"),
      system: SYSTEM_PROMPT,
      messages: data.messages.map((m) => ({
        role: m.from === "user" ? ("user" as const) : ("assistant" as const),
        content: m.text,
      })),
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    const text = await result.text;
    return { text: text.trim() || "I updated the preview — tell me what to refine next." };
  });
