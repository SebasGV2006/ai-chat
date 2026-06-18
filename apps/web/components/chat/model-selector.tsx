"use client";

import { AI_MODELS, type AIModel } from "@ai-chat/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface ModelSelectorProps {
  value: AIModel;
  onChange: (model: AIModel) => void;
}

export function ModelSelector({ value, onChange }: ModelSelectorProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as AIModel)}>
      <SelectTrigger className="w-[260px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(AI_MODELS).map(([key, model]) => (
          <SelectItem key={key} value={key as AIModel}>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{model.name}</span>
              <Badge className="bg-green-600/20 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs">
                Gratis / Free
              </Badge>
              <span className="text-xs text-muted-foreground ml-1">{model.description}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
