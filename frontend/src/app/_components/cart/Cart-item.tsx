"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/types";
import { useCart } from "@/app/context/Cart-context";

interface Props {
  item: CartItem;
}

export default function CartItemCard({ item }: Props) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <div className="flex gap-5 rounded-2xl bg-white p-4 shadow-xl shadow-black/10">
      <div className="relative h-28 w-36 shrink-0 overflow-hidden rounded-xl">
        <Image alt={item.name} className="object-cover" fill sizes="144px" src={item.image} />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-black text-[#E63B2E]">{item.name}</h3>
          <button
            aria-label="Remove item"
            onClick={() => removeItem(item.id)}
            className="text-zinc-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-zinc-500 line-clamp-1">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="grid h-9 w-9 place-items-center rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center font-black text-[#121316]">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="grid h-9 w-9 place-items-center rounded-full bg-[#E63B2E] text-white hover:bg-red-600 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <p className="font-black text-[#121316]">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
