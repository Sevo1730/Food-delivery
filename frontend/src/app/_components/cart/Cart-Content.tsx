"use client";

import { useCart } from "@/app/context/Cart-context";
import CartItemCard from "./Cart-item";

export default function CartContent() {
  const { items } = useCart();
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
