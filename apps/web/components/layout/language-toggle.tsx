"use client";

import { useLang } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLang}
      className="h-8 w-12 text-xs font-medium text-muted-foreground hover:text-foreground"
      aria-label="Cambiar idioma / Toggle language"
    >
      {lang === "es" ? "EN" : "ES"}
    </Button>
  );
}
