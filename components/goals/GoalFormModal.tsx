"use client";

import { Dialog, DialogTitle } from "@headlessui/react";
import { useState } from "react";

export default function GoalFormModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, target: number) => void;
}) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState<number>(0);

  const handleSubmit = () => {
    if (!name.trim() || target <= 0) return;
    onSave(name, target);
    setName("");
    setTarget(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-80">
          <DialogTitle className="text-purple-300 text-lg font-bold">
            Nova Meta
          </DialogTitle>

          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border w-full px-2 py-1 rounded mt-3 text-sm"
          />

          <input
            type="number"
            placeholder="Meta (dias)"
            value={target || ""}
            onChange={e => setTarget(Number(e.target.value))}
            className="border w-full px-2 py-1 rounded mt-3 text-sm"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-3 py-1 rounded bg-gray-600"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-3 py-1 rounded bg-purple-600 text-white"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
