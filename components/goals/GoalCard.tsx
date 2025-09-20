"use client";

import { Goal, Character } from "@/lib/types";
import { useAddXp } from "@/hooks/useAddXp";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function GoalCard({
  goal,
  onUpdate,
  onDelete,
  character,
  setCharacter,
}: {
  goal: Goal;
  onUpdate: (goal: Goal) => void;
  onDelete: (id: string) => void;
  character: Character | null;
  setCharacter: (c: Character) => void;
}) {
  const [scale, setScale] = useState(1);
  const addXp = useAddXp(character, setCharacter);

  const handleAddDay = () => {
    if (goal.progress < goal.target) {
      const updated = { ...goal, progress: goal.progress + 1 };
      onUpdate(updated);

      addXp(10);

      setScale(1.2);
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => setScale(1), 200);
    }
  };

  const handleRemoveDay = () => {
    if (goal.progress > 0) {
      const updated = { ...goal, progress: goal.progress - 1 };
      onUpdate(updated);
    }
  };

  return (
    <div 
      className="relative w-[90%] p-4 mb-6 rounded-[10px] shadow-md
      bg-gradient-to-b from-gray-800/60 to-gray-900/60
      backdrop-blur-sm border border-white/5
      overflow-hidden flex flex-col gap-6 items-center mx-auto"
    >
      <div className="relative z-10 flex w-full items-center justify-between bg-black/40 px-2 py-1 rounded-[6px]">
        <h3
          className="text-purple-300 font-semibold text-base break-words"
          style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.9)" }}
        >
          {goal.name}
        </h3>

        <button
          onClick={() => onDelete(goal.id)}
          className="text-red-400 hover:text-red-600"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>


      <div className="grid grid-cols-10 gap-1 w-full bg-black/30 p-2 rounded-[6px]">
        {Array.from({ length: goal.target }).map((_, index) => (
          <div
            key={index}
            className={`h-4 rounded-sm transition-colors duration-200 ${
              index < goal.progress ? "bg-green-500" : "bg-gray-600"
            }`}
          />
        ))}
      </div>

      <p
        className="relative z-10 text-purple-200 font-extrabold text-3xl text-center tracking-wide bg-black/40 px-3 py-1 rounded-[6px] transition-transform duration-200"
        style={{
          textShadow: "2px 2px 6px rgba(0,0,0,1)",
          transform: `scale(${scale})`,
        }}
      >
        {goal.progress}/{goal.target}
      </p>

      <div className="flex gap-3 relative z-10">
        <button
          onClick={handleRemoveDay}
          className="bg-red-600 p-2 rounded-full hover:bg-red-700"
        >
          <MinusIcon className="h-5 w-5 text-white" />
        </button>
        <button
          onClick={handleAddDay}
          className="bg-green-600 p-2 rounded-full hover:bg-green-700"
        >
          <PlusIcon className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
}
