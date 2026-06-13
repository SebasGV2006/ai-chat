import type { AIModel } from "@ai-chat/types";
import { getGeminiProvider } from "./gemini";

export { getGeminiProvider };

export function getModelProvider(model: AIModel, apiKey: string) {
  const google = getGeminiProvider(apiKey);
  return google(model);
}
