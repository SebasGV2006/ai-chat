"use client";

import { AI_MODELS, type AIModel } from "@ai-chat/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ModelSelectorProps {
  value: AIModel;
  onChange: (model: AIModel) => void;
  className?: string;
}

export function ModelSelector({ value, onChange, className }: ModelSelectorProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as AIModel)}>
      <SelectTrigger className={className ?? "h-8 w-[180px] text-xs border-border/50 bg-transparent hover:bg-accent transition-colors"}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(Object.entries(AI_MODELS) as [AIModel, { label: string }][]).map(
          ([modelId, { label }]) => (
            <SelectItem key={modelId} value={modelId} className="text-sm">
              {label}
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  );
}
