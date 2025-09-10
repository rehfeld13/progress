"use client";

import { CharacterProvider } from "./context/CharacterContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <CharacterProvider>{children}</CharacterProvider>;
}
