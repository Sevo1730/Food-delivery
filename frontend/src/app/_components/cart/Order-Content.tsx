"use client";

import { useCart } from "@/app/context/Cart-context";

export default function OrderContent() {
  const { items, total } = useCart();
  return (
    <div className="rounded-xl bg-zinc-50 p-4">
      <p className="mb-3 text-sm font-bold text-[#121316]">Захиалгын жагсаалт</p>
      <div className="space-y-2 border-b border-zinc-200 pb-3 mb-3">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-zinc-600">{item.name} × {item.quantity}</span>
            <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between font-black text-[#121316]">
        <span>Нийт</span>
        <span className="text-[#E63B2E]">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
