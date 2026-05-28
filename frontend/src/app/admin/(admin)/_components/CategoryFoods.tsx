"use client";

import { useState } from "react";
import { categories } from "@/lib/menuData";

export default function CategoryFoods() {
  const [selected, setSelected] = useState(categories[0]);
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              selected === cat ? "bg-[#E63B2E] text-white" : "bg-white text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <p className="text-sm text-zinc-500">
        <span className="font-bold text-[#121316]">{selected}</span> категорийн хоолнууд энд харагдана.
      </p>
    </div>
  );
}
