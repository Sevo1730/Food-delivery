"use client";

import CartDrawer from "@/app/_components/cart/Cart-drawer";
import FoodDetailModal from "@/app/_components/cart/FoodDetailModal";
import SuccessModal from "@/app/_components/cart/SuccessModal";

export default function GlobalModals() {
  return (
    <>
      <CartDrawer />
      <FoodDetailModal />
      <SuccessModal />
    </>
  );
}
