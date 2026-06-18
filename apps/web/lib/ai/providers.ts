import { getModelProvider } from "@ai-chat/ai-core";
import type { AIModel } from "@ai-chat/types";

export function getProvider(model: AIModel) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) throw new Error("GOOGLE_GENERATIVE_AI_API_KEY no está configurada");
  return getModelProvider(model, apiKey);
}
