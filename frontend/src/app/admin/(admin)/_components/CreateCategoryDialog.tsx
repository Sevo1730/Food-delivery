"use client";

import { useState } from "react";

interface Props {
  onCreated?: (name: string) => void;
}

export default function CreateCategoryDialog({ onCreated }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreated?.(name.trim());
    setName("");
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-[#E63B2E] px-5 py-2.5 text-sm font-black text-white hover:bg-red-600"
      >
        + Категори нэмэх
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="mb-4 text-xl font-black text-[#121316]">Шинэ категори</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Категорийн нэр..."
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-[#E63B2E]"
              />
              <div className="flex gap-3">
                <button type="submit" className="flex-1 rounded-full bg-[#E63B2E] py-3 font-black text-white hover:bg-red-600">
                  Хадгалах
                </button>
                <button type="button" onClick={() => setOpen(false)} className="flex-1 rounded-full border border-zinc-200 py-3 font-bold text-zinc-600 hover:bg-zinc-50">
                  Болих
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
