import { Character } from "./types";

export const xpTable = [0, 100, 250, 500, 1000];

export const getNextLevelXp = (level: number) => {
  return xpTable[level] || (level * 500);
};

export const addXp = (character: Character, amount: number): Character => {
  let newXp = character.xp + amount;
  let newLevel = character.level;
  let coins = character.coins;

  while (newXp >= getNextLevelXp(newLevel)) {
    newXp -= getNextLevelXp(newLevel);
    newLevel++;
    coins++; // recompensa
  }

  return { ...character, xp: newXp, level: newLevel, coins };
};
