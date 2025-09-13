"use client";

import { useState, useEffect } from "react";
import { Skill } from "@/app/lib/types";
import { loadData, saveData } from "@/app/lib/storage";
import { addXp } from "@/app/lib/xp";
import { useCharacter } from "../context/CharacterContext";

import {
  PlusIcon,
  MinusIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import confetti from "canvas-confetti";

export default function SkillsContainer() {
  const { character, setCharacter } = useCharacter();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillName, setSkillName] = useState("");
  const [animatedPoints, setAnimatedPoints] = useState<{ [key: string]: number[] }>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega skills do localStorage
  useEffect(() => {
    const savedSkills = loadData<Skill[]>("skills", []);
    setSkills(savedSkills);
    setIsLoaded(true);
  }, []);

  // Salva skills no localStorage sempre que mudarem
  useEffect(() => {
    if (isLoaded) {
      saveData("skills", skills);
    }
  }, [skills, isLoaded]);

  const handleAddSkill = () => {
    if (!skillName.trim()) return;
    const newSkill: Skill = { id: Date.now().toString(), name: skillName, progress: 0 };
    setSkills(prev => [...prev, newSkill]);
    setSkillName("");
  };

  const handleAddPoint = (id: string) => {
    setSkills(prev =>
      prev.map(skill =>
        skill.id === id ? { ...skill, progress: skill.progress + 1 } : skill
      )
    );

    if (character) {
      // Atualiza o contexto, Header atualiza automaticamente
      setCharacter(addXp(character, 10));
    }

    // Confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleRemovePoint = (id: string) => {
    setSkills(prev =>
      prev.map(skill =>
        skill.id === id && skill.progress > 0
          ? { ...skill, progress: skill.progress - 1 }
          : skill
      )
    );
  };

  const handleDeleteSkill = (id: string) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
  };

  return (
    <div className="flex flex-col items-start justify-start w-full">
      <h2 className="text-xl font-bold mb-4 text-purple-400">Habilidades</h2>

      <div className="bg-gray-800/50 p-3 rounded-lg min-h-[150px] w-full flex flex-col gap-4 sm:w-96">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nome da habilidade"
            value={skillName}
            onChange={e => setSkillName(e.target.value)}
            className="border px-2 py-1 rounded flex-1 text-sm"
          />
          <button
            onClick={handleAddSkill}
            className="bg-purple-600 p-1 rounded-full hover:bg-purple-700 transition transform hover:scale-110"
          >
            <PlusIcon className="h-5 w-5 text-white" />
          </button>
        </div>

        {skills.length === 0 ? (
          <p className="text-gray-400 text-center">Adicione uma habilidade</p>
        ) : (
          <div className="flex flex-col gap-3">
            {skills.map(skill => (
              <div
                key={skill.id}
                className="bg-gray-800/50 p-2 rounded-md shadow-md flex flex-col w-full relative"
              >
                {/* Header do card com nome + menu */}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-purple-300 truncate overflow-hidden max-w-[80%]">
                    {skill.name}
                  </h3>

                  <Menu as="div" className="relative inline-block text-left">
                    <MenuButton className="p-1 rounded-full hover:bg-gray-700">
                      <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
                    </MenuButton>

                    <MenuItems className="absolute right-0 mt-2 w-28 origin-top-right z-50 rounded-md bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none">
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            onClick={() => handleDeleteSkill(skill.id)}
                            className={`${
                              focus ? "bg-red-600 text-white" : "text-red-400"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <TrashIcon className="h-4 w-4 mr-2" />
                            Excluir
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>

                {/* Barrinhas de progresso */}
                <div className="flex flex-wrap gap-1 my-2 w-full justify-center">
                  {Array.from({ length: skill.progress }).map((_, i) => {
                    const isNew = animatedPoints[skill.id]?.includes(
                      i === skill.progress - 1 ? i : -1
                    ) || false;
                    return (
                      <div
                        key={i}
                        className={`w-5 h-5 rounded-sm transition-transform duration-500 
                          ${
                            isNew
                              ? "scale-125 animate-pulse shadow-lg shadow-pink-500/50"
                              : "scale-100"
                          }
                          bg-gradient-to-r from-purple-500 to-indigo-500`}
                      />
                    );
                  })}
                </div>

                <span className="text-xs mb-2 text-purple-200 text-center">
                  Pontos: {skill.progress}
                </span>

                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleRemovePoint(skill.id)}
                    className="bg-red-600 p-1 rounded-full hover:bg-red-700 transition transform hover:scale-110 text-sm"
                  >
                    <MinusIcon className="h-5 w-5 text-white" />
                  </button>

                  <button
                    onClick={() => handleAddPoint(skill.id)}
                    className="bg-purple-600 p-1 rounded-full hover:bg-purple-700 transition transform hover:scale-110 text-sm"
                  >
                    <PlusIcon className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
