"use client";

import { useCart } from "@/app/context/Cart-context";

export default function CartHeader() {
  const { count } = useCart();
  return (
    <div className="mb-10">
      <h1 className="text-4xl font-black text-white">Таны cart</h1>
      {count > 0 && (
        <p className="mt-1 text-zinc-400">{count} бүтээгдэхүүн</p>
      )}
    </div>
  );
}
