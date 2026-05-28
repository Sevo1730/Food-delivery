"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, MapPin, User } from "lucide-react";
import { useCart } from "@/app/context/Cart-context";
import { useUI } from "@/app/context/UIContext";
import { useAuth } from "@/app/context/AuthProvider";
import AddressModal from "./AddressModal";

export default function Header() {
  const { count } = useCart();
  const { openCart, setDeliveryAddress, deliveryAddress } = useUI();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [addressOpen, setAddressOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#121316]">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#E63B2E] shadow-lg shadow-red-500/20">
              <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7">
                <ellipse cx="16" cy="20" rx="12" ry="5" fill="white" opacity="0.9" />
                <path d="M4 20 Q16 8 28 20" stroke="white" strokeWidth="2.5" fill="none" />
                <rect x="13" y="6" width="6" height="3" rx="1.5" fill="white" />
              </svg>
            </span>
            <span>
              <span className="block text-2xl font-black leading-6">
                Nom<span className="text-[#E63B2E]">Nom</span>
              </span>
              <span className="text-sm text-zinc-400">Swift delivery</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAddressOpen(true)}
              className="hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#121316] shadow-sm md:flex hover:bg-zinc-100 transition-colors"
            >
              <MapPin className="h-4 w-4 text-[#E63B2E]" />
              <span className="text-[#E63B2E] font-semibold">Delivery address:</span>
              <span className="max-w-[140px] truncate font-medium text-zinc-500">
                {deliveryAddress || "Add Location"}
              </span>
              <span className="ml-1 text-zinc-400">&rsaquo;</span>
            </button>

            <button
              onClick={openCart}
              aria-label={`Cart – ${count} items`}
              className="relative grid h-12 w-12 place-items-center rounded-full bg-white text-[#121316] hover:bg-zinc-100"
            >
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#E63B2E] px-1 text-xs font-bold text-white">
                  {count}
                </span>
              )}
            </button>

            <div ref={userRef} className="relative">
              {user ? (
                <>
                  <button
                    onClick={() => setUserOpen((v) => !v)}
                    className="grid h-12 w-12 place-items-center rounded-full bg-[#E63B2E] text-white hover:bg-red-600"
                  >
                    <User className="h-5 w-5" />
                  </button>

                  {userOpen && (
                    <div className="absolute right-0 top-14 w-56 rounded-2xl bg-white shadow-xl border border-zinc-100 overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-zinc-100">
                        <p className="text-sm font-bold text-[#121316] truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setUserOpen(false);
                          router.push("/auth/login");
                        }}
                        className="w-full px-4 py-3 text-left text-sm text-zinc-500 hover:bg-zinc-50 transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="grid h-12 w-12 place-items-center rounded-full bg-[#E63B2E] text-white hover:bg-red-600"
                >
                  <User className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>

      <AddressModal
        open={addressOpen}
        onClose={() => setAddressOpen(false)}
        onSave={(addr) => setDeliveryAddress(addr)}
        initialAddress={deliveryAddress}
      />
    </>
  );
}
