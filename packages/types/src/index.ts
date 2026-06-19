// Los dos modelos gratuitos de Gemini disponibles en Google AI Studio
export type AIModel =
  | "gemini-2.5-flash"
  | "gemini-2.5-flash-lite-preview-06-17";

export type MessageRole = "system" | "user" | "assistant";

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  model: AIModel;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppUser {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
}

export interface ChatRequest {
  conversationId: string | null;
  messages: Pick<ChatMessage, "role" | "content">[];
  model: AIModel;
}

export interface ConversationWithMessages extends Conversation {
  messages: ChatMessage[];
}

// Metadata de los modelos para mostrar en la UI
export const AI_MODELS: Record<AIModel, { label: string }> = {
  "gemini-2.5-flash": {
    label: "Gemini 2.5 Flash",
  },
  "gemini-2.5-flash-lite-preview-06-17": {
    label: "Gemini 2.5 Flash-Lite",
  },
};
