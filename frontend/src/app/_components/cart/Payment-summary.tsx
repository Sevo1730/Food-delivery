"use client";

import Link from "next/link";
import { useCart } from "@/app/context/Cart-context";

export default function PaymentSummary() {
  const { items, total } = useCart();
  return (
    <div className="h-fit rounded-2xl bg-white p-6 shadow-xl shadow-black/10">
      <h2 className="mb-6 text-xl font-black text-[#121316]">Захиалгын мэдээлэл</h2>
      <div className="space-y-3 border-b border-zinc-100 pb-5">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-zinc-600">{item.name} × {item.quantity}</span>
            <span className="font-semibold text-[#121316]">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between pt-5 pb-6">
        <span className="font-black text-[#121316]">Нийт дүн</span>
        <span className="text-xl font-black text-[#E63B2E]">${total.toFixed(2)}</span>
      </div>
      <Link
        href="/auth/login"
        className="block w-full rounded-full bg-[#E63B2E] py-4 text-center font-black text-white hover:bg-red-600 transition-colors"
      >
        Checkout
      </Link>
      <Link
        href="/"
        className="mt-3 block w-full rounded-full border border-zinc-200 py-4 text-center font-bold text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 transition-colors"
      >
        Үргэлжлүүлэн захиалах
      </Link>
    </div>
  );
}
