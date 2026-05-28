"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { MenuItem } from "@/types";

interface UIContextType {
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  selectedFood: MenuItem | null;
  openFood: (item: MenuItem) => void;
  closeFood: () => void;

  successOpen: boolean;
  openSuccess: () => void;
  closeSuccess: () => void;

  deliveryAddress: string;
  setDeliveryAddress: (addr: string) => void;
}

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<MenuItem | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const openFood = useCallback((item: MenuItem) => setSelectedFood(item), []);
  const closeFood = useCallback(() => setSelectedFood(null), []);
  const openSuccess = useCallback(() => setSuccessOpen(true), []);
  const closeSuccess = useCallback(() => setSuccessOpen(false), []);

  return (
    <UIContext.Provider value={{
      cartOpen, openCart, closeCart,
      selectedFood, openFood, closeFood,
      successOpen, openSuccess, closeSuccess,
      deliveryAddress, setDeliveryAddress,
    }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
