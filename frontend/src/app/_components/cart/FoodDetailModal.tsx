"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useUI } from "@/app/context/UIContext";
import { useCart } from "@/app/context/Cart-context";
import { useToast } from "@/app/context/ToastContext";

export default function FoodDetailModal() {
  const { selectedFood, closeFood } = useUI();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [qty, setQty] = useState(1);

  if (!selectedFood) return null;

  const total = (selectedFood.price * qty).toFixed(2);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(selectedFood);
    showToast("Food is being added to the cart!");
    closeFood();
    setQty(1);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={closeFood} aria-hidden />
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden animate-fade-in">
          <button
            onClick={closeFood}
            className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full bg-white shadow-md text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col sm:flex-row">
            <div className="relative h-64 sm:h-auto sm:w-[45%] shrink-0">
              <Image
                alt={selectedFood.name}
                src={selectedFood.image}
                fill
                className="object-cover"
                sizes="400px"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h2 className="text-2xl font-black text-[#E63B2E] mb-3">{selectedFood.name}</h2>
                <p className="text-sm leading-6 text-zinc-500">{selectedFood.description}</p>
              </div>

              <div>
                <div className="mb-4">
                  <p className="text-sm text-zinc-400 mb-1">Total price</p>
                  <p className="text-3xl font-black text-[#121316]">${total}</p>
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="grid h-10 w-10 place-items-center rounded-full border border-zinc-300 text-zinc-600 hover:bg-zinc-50 transition-colors text-lg font-bold"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-lg font-black text-[#121316]">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-zinc-300 text-zinc-600 hover:bg-zinc-50 transition-colors text-lg font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="w-full rounded-xl bg-[#121316] py-4 font-black text-white hover:bg-zinc-800 transition-colors"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
