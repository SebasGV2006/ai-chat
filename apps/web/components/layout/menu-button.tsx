"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function MenuButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 md:hidden"
      onClick={() => {
        window.dispatchEvent(new CustomEvent("toggle-sidebar"));
      }}
    >
      <Menu className="h-4 w-4" />
      <span className="sr-only">Abrir menú</span>
    </Button>
  );
}
