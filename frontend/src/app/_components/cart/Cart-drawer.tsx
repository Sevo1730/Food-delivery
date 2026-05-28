"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ShoppingCart, UtensilsCrossed, Clock, MapPin } from "lucide-react";
import { useUI } from "@/app/context/UIContext";
import { useCart } from "@/app/context/Cart-context";
import { useAuth } from "@/app/context/AuthProvider";
import { useToast } from "@/app/context/ToastContext";
import { orderApi } from "@/lib/axios";
import { BackendOrder } from "@/types";

const SHIPPING = 0.99;

const STATUS_STYLE: Record<string, string> = {
  PENDING: "border border-yellow-400 text-yellow-600",
  DELIVERED: "border border-green-400 text-green-600",
  CANCELED: "border border-zinc-300 text-zinc-500",
};

export default function CartDrawer() {
  const { cartOpen, closeCart, deliveryAddress, openSuccess } = useUI();
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [tab, setTab] = useState<"cart" | "order">("cart");
  const [orders, setOrders] = useState<BackendOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const grandTotal = total > 0 ? (total + SHIPPING).toFixed(2) : "—";

  // Fetch my orders when Order tab opens
  useEffect(() => {
    if (tab === "order" && user) {
      setLoadingOrders(true);
      orderApi.getMyOrders()
        .then((res) => setOrders(res.data))
        .catch(() => setOrders([]))
        .finally(() => setLoadingOrders(false));
    }
  }, [tab, user]);

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");

    if (!user || !token || token === "mock-token") {
      closeCart();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
      return;
    }

    if (!deliveryAddress) {
      showToast("Хүргэлтийн хаягаа нэмнэ үү");
      return;
    }

    setCheckoutLoading(true);
    try {
      await orderApi.create({
        foodOrderItems: items.map((item) => ({
          food: item._id || item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        })),
        totalPrice: parseFloat((total + SHIPPING).toFixed(2)),
        deliveryAddress,
      });
      clearCart();
      closeCart();
      openSuccess();
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        closeCart();
        window.location.href = "/auth/login";
      } else {
        showToast("Захиалга хийхэд алдаа гарлаа. Дахин оролдоно уу.");
      }
    } finally {
      setCheckoutLoading(false);
    }
  };

  const formatDate = (iso: string) => iso.split("T")[0].replace(/-/g, "/");

  return (
    <>
      {cartOpen && (
        <div className="fixed inset-0 z-40 bg-black/30" onClick={closeCart} aria-hidden />
      )}

      <div className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-105 flex-col bg-zinc-100 shadow-2xl transition-transform duration-300 ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Header */}
        <div className="flex items-center justify-between bg-white px-5 py-4 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-[#121316]" />
            <span className="text-base font-black text-[#121316]">Order detail</span>
          </div>
          <button onClick={closeCart} className="grid h-8 w-8 place-items-center rounded-full border border-zinc-200 text-zinc-500 hover:bg-zinc-100 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="mx-4 mt-4 flex rounded-full bg-white p-1">
          {(["cart", "order"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 rounded-full py-2.5 text-sm font-bold transition-colors capitalize ${tab === t ? "bg-[#E63B2E] text-white" : "text-zinc-500"}`}>
              {t === "cart" ? "Cart" : "Order"}
            </button>
          ))}
        </div>

        {tab === "cart" ? (
          <div className="flex flex-1 flex-col overflow-y-auto gap-3 p-4">
            {/* Cart items */}
            <div className="rounded-2xl bg-white p-4">
              <p className="mb-3 font-black text-[#121316]">My cart</p>
              {items.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="mb-3 grid h-14 w-14 place-items-center rounded-full bg-zinc-100">
                    <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8">
                      <ellipse cx="16" cy="20" rx="12" ry="5" fill="#E63B2E" opacity="0.8" />
                      <path d="M4 20 Q16 8 28 20" stroke="#E63B2E" strokeWidth="2.5" fill="none" />
                      <rect x="13" y="6" width="6" height="3" rx="1.5" fill="#E63B2E" />
                    </svg>
                  </div>
                  <p className="font-black text-[#121316] text-sm">Your cart is empty</p>
                  <p className="text-xs text-zinc-400 mt-1">Add some delicious dishes to your cart and satisfy your cravings!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, i) => (
                    <div key={`${item.id}-${i}`}>
                      {i > 0 && <div className="border-t border-dashed border-zinc-200 mb-4" />}
                      <div className="flex gap-3">
                        <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                          <Image alt={item.name} src={item.image} fill className="object-cover" sizes="96px" />
                        </div>
                        <div className="flex flex-1 flex-col justify-between min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="font-black text-sm text-[#E63B2E] truncate">{item.name}</p>
                              <p className="text-xs text-zinc-400 line-clamp-2 mt-0.5">{item.description}</p>
                            </div>
                            <button onClick={() => removeItem(item.id)}
                              className="shrink-0 grid h-6 w-6 place-items-center rounded-full border border-[#E63B2E] text-[#E63B2E] hover:bg-red-50 transition-colors">
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-3 text-zinc-500">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-base font-bold hover:text-zinc-800">−</button>
                              <span className="text-sm font-black text-[#121316]">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-base font-bold hover:text-zinc-800">+</button>
                            </div>
                            <p className="font-black text-sm text-[#121316]">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Delivery location */}
            <div className="rounded-2xl bg-white p-4">
              <p className="mb-2 font-black text-[#121316]">Delivery location</p>
              <div className="rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3 text-sm text-zinc-500 min-h-15">
                {deliveryAddress || <span className="text-zinc-300">No address added yet</span>}
              </div>
            </div>

            {/* Payment info */}
            <div className="rounded-2xl bg-white p-4">
              <p className="mb-3 font-black text-[#121316]">Payment info</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Items</span>
                  <span className="font-bold text-[#121316]">{total > 0 ? `$${total.toFixed(2)}` : "—"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Shipping</span>
                  <span className="font-bold text-[#121316]">{total > 0 ? `${SHIPPING.toFixed(2)}$` : "—"}</span>
                </div>
                <div className="border-t border-dashed border-zinc-200 my-2" />
                <div className="flex justify-between">
                  <span className="font-bold text-[#121316]">Total</span>
                  <span className="font-black text-[#121316]">{total > 0 ? `$${grandTotal}` : "—"}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={items.length === 0 || checkoutLoading}
                className="mt-4 w-full rounded-full bg-[#E63B2E] py-4 font-black text-white hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {checkoutLoading ? "Захиалж байна..." : "Checkout"}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="rounded-2xl bg-white p-4">
              <p className="mb-4 font-black text-[#121316]">Order history</p>
              {!user ? (
                <p className="text-sm text-zinc-400 text-center py-6">Захиалгын түүх харахын тулд нэвтрэнэ үү</p>
              ) : loadingOrders ? (
                <p className="text-sm text-zinc-400 text-center py-6">Уншиж байна...</p>
              ) : orders.length === 0 ? (
                <p className="text-sm text-zinc-400 text-center py-6">Захиалгын түүх хоосон байна</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order, i) => (
                    <div key={order._id}>
                      {i > 0 && <div className="border-t border-dashed border-zinc-200 mb-4" />}
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-black text-sm text-[#121316]">
                          ${order.totalPrice.toFixed(2)}{" "}
                          <span className="text-zinc-400">(#{order._id.slice(-5)})</span>
                        </p>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLE[order.status] ?? ""}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="space-y-1.5 text-xs text-zinc-500">
                        {order.foodOrderItems.map((it, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <UtensilsCrossed className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                            <span>{it.name}</span>
                            <span className="ml-auto">x {it.quantity}</span>
                          </div>
                        ))}
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                          <span>{formatDate(order.createdAt)}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-zinc-400 mt-0.5" />
                          <span className="truncate">{order.deliveryAddress}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
