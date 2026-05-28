"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { MenuItem } from "@/types";
import { useCart } from "@/app/context/Cart-context";
import { useUI } from "@/app/context/UIContext";

interface Props {
  item: MenuItem;
}

export default function MenuCard({ item }: Props) {
  const { items } = useCart();
  const { openFood } = useUI();

  const inCart = items.some((i) => i.id === item.id);

  return (
    <article
      className="overflow-hidden rounded-[1.15rem] bg-white shadow-xl shadow-black/10 cursor-pointer"
      onClick={() => openFood(item)}
    >
      <div className="relative overflow-hidden rounded-xl mx-4 mt-4">
        <div className="relative aspect-[1.8] w-full">
          <Image
            alt={item.name}
            className="object-cover rounded-xl"
            fill
            sizes="(min-width: 1280px) 384px, (min-width: 768px) 45vw, 90vw"
            src={item.image}
          />
        </div>
        <button
          aria-label={inCart ? "Added to cart" : `Add ${item.name} to cart`}
          className={`absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full shadow-lg transition hover:scale-110 ${
            inCart
              ? "bg-[#3d3d3b] text-white"
              : "bg-white text-2xl font-black text-[#E63B2E] hover:bg-[#E63B2E] hover:text-white"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            openFood(item);
          }}
        >
          {inCart ? <Check className="h-5 w-5" strokeWidth={3} /> : "+"}
        </button>
      </div>
      <div className="px-4 pb-4 pt-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-black text-[#E63B2E] leading-snug">{item.name}</h3>
          <p className="pt-0.5 text-base font-black text-[#121316] shrink-0">
            ${item.price.toFixed(2)}
          </p>
        </div>
        <p className="mt-2 text-sm leading-5 text-zinc-500 line-clamp-2">
          {item.description}
        </p>
      </div>
    </article>
  );
}
