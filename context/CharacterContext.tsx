"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Character } from "@/lib/types";
import { loadData, saveData } from "@/lib/storage";

type CharacterContextType = {
  character: Character | null;
  setCharacter: (char: Character) => void;
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const savedChar = loadData<Character>("character", {
      name: "Herói",
      level: 1,
      xp: 0,
      coins: 0,
      inventory: [],
    });
    setCharacter(savedChar);
  }, []);

  useEffect(() => {
    if (character) {
      saveData("character", character);
    }
  }, [character]);

  return (
    <CharacterContext.Provider value={{ character, setCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacter must be used within CharacterProvider");
  }
  return context;
}
