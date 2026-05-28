import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-40 text-center">
      <ShoppingBag className="h-20 w-20 text-zinc-600 mb-6" />
      <h2 className="text-3xl font-black text-white mb-3">Таны cart хоосон байна</h2>
      <p className="text-zinc-400 mb-8">Менюнээс хоол сонгоод cart-д нэмнэ үү</p>
      <Link
        href="/"
        className="rounded-full bg-[#E63B2E] px-8 py-4 font-black text-white hover:bg-red-600"
      >
        Менюг үзэх
      </Link>
    </div>
  );
}
