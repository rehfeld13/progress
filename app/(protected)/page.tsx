"use client";

import CharacterCard from "@/components/CharacterCard";
import { useCharacter } from "../../context/CharacterContext";
import GoalsContainer from "@/components/goals/GoalsContainer";

export default function Home() {
  const { character } = useCharacter();

  return (
    <main className="flex flex-col px-4 sm:px-24">
      <h1 className="text-2xl font-bold mb-6">Início</h1>
      
      {character && <CharacterCard character={character} />}
      
      <GoalsContainer />
    </main>
  );
}
