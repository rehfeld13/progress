"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { playSound } from "../lib/sound";

type ToastProps = {
  visible: boolean;
};

// -------------------- XP --------------------
export function XpToast({ amount, visible }: ToastProps & { amount: number }) {
  useEffect(() => {
    if (visible) playSound("/sounds/xp.wav");
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="flex items-center px-5 py-0.5 rounded-sm border border-purple-400 bg-purple-950 text-purple-100 shadow-sm"
        >
          <span className="font-medium text-base">Você ganhou experiência</span>
          <img src="/xp.png" alt="XP" className="w-12 h-12" />
          <span className="font-bold text-base">+ {amount}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// -------------------- LEVEL UP --------------------
export function LevelUpToast({ level, visible }: ToastProps & { level: number }) {
  useEffect(() => {
    if (visible) playSound("/sounds/levelup.mp3");
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="flex items-center px-5 py-0.5 rounded-sm border border-purple-400 bg-purple-950 text-purple-100 shadow-sm"
        >
          <span className="font-medium text-base">Nível {level} alcançado!</span>
          <img src="/levelup.png" alt="Level Up" className="w-8 h-8" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// -------------------- COIN --------------------
export function CoinToast({ visible }: ToastProps) {
  useEffect(() => {
    if (visible) playSound("/sounds/coin.wav");
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="flex items-center px-5 py-0.5 rounded-sm border border-purple-400 bg-purple-950 text-purple-100 shadow-sm"
        >
          <span className="font-medium text-base">Você ganhou ouro</span>
          <img src="/coin.png" alt="Moeda" className="w-8 h-8" />
          <span className="font-bold text-base">+ 1</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
