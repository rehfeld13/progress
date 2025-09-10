"use client";

import { Character } from "@/app/lib/types";
import Image from "next/image";
import { getNextLevelXp } from "@/app/lib/xp";

export default function CharacterCard({ character }: { character: Character }) {
  const nextLevelXp = getNextLevelXp(character.level);
  const xpPercentage = Math.min((character.xp / nextLevelXp) * 100, 100);

  return (
    <div className="p-4 border flex rounded items-center shadow bg-gray-800/50 mb-6 flex-col sm:flex-row">
      <div>
        <Image
          src="/player.png"
          alt="Character Avatar"
          width={200}
          height={200}
          priority
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <div className="w-full sm:w-2/3 flex flex-col gap-2">
        <h2 className="text-xl font-bold">{character.name}</h2>
        <div className="flex items-center justify-between">
          <p>Nível: {character.level}</p>
          <p>Próx: {character.level + 1}</p>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-4 mt-2 overflow-hidden">
          <div
            className="bg-purple-500 h-4 transition-all duration-300"
            style={{ width: `${xpPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-purple-200 mt-1">
          {character.xp} / {nextLevelXp} XP
        </p>
      </div>
    </div>
  );
}
