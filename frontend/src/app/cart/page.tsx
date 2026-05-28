"use client";

import Header from "@/app/_components/cards/Header";
import Footer from "@/app/_components/cards/Footer";
import CartHeader from "@/app/_components/cart/Cart-header";
import CartContent from "@/app/_components/cart/Cart-Content";
import PaymentSummary from "@/app/_components/cart/Payment-summary";
import EmptyCart from "@/app/_components/cart/Empty-cart";
import { useCart } from "@/app/context/Cart-context";

export default function CartPage() {
  const { items } = useCart();

  return (
    <main className="min-h-screen bg-[#3d3d3b]">
      <Header />

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="mx-auto max-w-7xl px-6 py-16">
          <CartHeader />
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <CartContent />
            <PaymentSummary />
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
