import { useCallback } from "react";
import { Character } from "@/app/lib/types";
import { XpToast, LevelUpToast, CoinToast } from "@/app/components/toasts";
import toast from "react-hot-toast";

export const xpTable = [0, 100, 250, 500, 1000];

export const getNextLevelXp = (level: number) => xpTable[level] || level * 500;

export function useAddXp(
  character: Character | null,
  setCharacter: (c: Character) => void
) {
  const addXp = useCallback(
    (amount: number) => {
      if (!character) return;

      let newXp = character.xp + amount;
      let newLevel = character.level;
      let coins = character.coins;

      toast.custom((t) => <XpToast amount={amount} visible={t.visible} key={t.id} />);

      while (newXp >= getNextLevelXp(newLevel)) {
        newXp -= getNextLevelXp(newLevel);
        newLevel++;
        coins++;

        toast.custom((t) => <LevelUpToast level={newLevel} visible={t.visible} key={t.id} />);
        toast.custom((t) => <CoinToast visible={t.visible} key={t.id} />);
      }

      setCharacter({ ...character, xp: newXp, level: newLevel, coins });
    },
    [character, setCharacter]
  );

  return addXp;
}
