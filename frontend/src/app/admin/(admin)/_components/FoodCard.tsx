"use client";

import Image from "next/image";
import { useState } from "react";
import { MenuItem } from "@/types";
import EditFood from "./EditFood";

interface Props {
  food: MenuItem;
  onDelete?: (id: string) => void;
  onUpdate?: (food: MenuItem) => void;
}

export default function AdminFoodCard({ food, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-md">
      <div className="relative aspect-[1.8] w-full overflow-hidden rounded-xl mb-3">
        <Image alt={food.name} className="object-cover" fill sizes="300px" src={food.image} />
      </div>
      {editing ? (
        <EditFood
          food={food}
          onSave={(updated) => { onUpdate?.(updated); setEditing(false); }}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <>
          <h3 className="font-black text-[#E63B2E] mb-1">{food.name}</h3>
          <p className="text-sm text-zinc-500 mb-3 line-clamp-2">{food.description}</p>
          <p className="font-black text-[#121316] mb-3">${food.price.toFixed(2)}</p>
          <div className="flex gap-2">
            <button onClick={() => setEditing(true)} className="flex-1 rounded-full bg-zinc-100 py-2 text-sm font-bold text-zinc-700 hover:bg-zinc-200">
              Засах
            </button>
            <button onClick={() => onDelete?.(food.id)} className="flex-1 rounded-full bg-red-50 py-2 text-sm font-bold text-red-500 hover:bg-red-100">
              Устгах
            </button>
          </div>
        </>
      )}
    </div>
  );
}
