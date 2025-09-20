"use client";

import { useState, useEffect } from "react";
import { Goal } from "@/lib/types";
import { loadData, saveData } from "@/lib/storage";
import { useCharacter } from "../../context/CharacterContext";
import GoalFormModal from "./GoalFormModal";
import GoalCard from "./GoalCard";

export default function GoalsContainer() {
  const { character, setCharacter } = useCharacter();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedGoals = loadData<Goal[]>("goals", []);
    setGoals(savedGoals);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) saveData("goals", goals);
  }, [goals, isLoaded]);

  const handleAddGoal = (name: string, target: number) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      name,
      target,
      progress: 0,
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const handleUpdateGoal = (updatedGoal: Goal) => {
    setGoals(prev =>
      prev.map(goal => (goal.id === updatedGoal.id ? updatedGoal : goal))
    );
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  return (
    <div className="flex flex-col items-start w-full">
      <h2 className="text-xl font-bold mb-4 text-purple-400">Metas</h2>
      
      <div className="bg-gray-950/50 p-2 rounded-lg min-h-[150px] w-full gap-2 flex flex-col items-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex w-1/2 justify-center rounded-md bg-purple-600 px-3 py-2 text-sm/6 font-semibold hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
        >
          Criar nova meta
        </button>

        <div className="flex flex-col gap-4 mt-2 items-center w-full">
          {goals.length === 0 ? (
            <p className="text-gray-400 text-center text-sm/6 w-full">
              Nenhuma meta criada
            </p>
          ) : (
            goals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onUpdate={handleUpdateGoal}
                onDelete={handleDeleteGoal}
                character={character}
                setCharacter={setCharacter}
              />
            ))
          )}
        </div>
      </div>

      <GoalFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddGoal}
      />
    </div>
  );
}
