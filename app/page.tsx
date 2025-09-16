"use client";

import CharacterCard from "@/app/components/CharacterCard";
import { useCharacter } from "./context/CharacterContext";
import GoalsContainer from "./components/goals/GoalsContainer";

export default function Home() {
  const { character } = useCharacter();

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Meu Personagem</h1>
      
      {character && <CharacterCard character={character} />}
      
      <GoalsContainer />
    </main>
  );
}
