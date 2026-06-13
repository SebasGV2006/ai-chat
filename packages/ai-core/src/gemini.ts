import { createGoogleGenerativeAI } from "@ai-sdk/google";

export function getGeminiProvider(apiKey: string) {
  return createGoogleGenerativeAI({ apiKey });
}
