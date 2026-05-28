"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, ShoppingBag } from "lucide-react";

const nav = [
  { href: "/admin", label: "Food menu", icon: LayoutGrid },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
];

export default function AdminSidebar() {
  const path = usePathname();

  return (
    <aside className="flex w-52 shrink-0 flex-col bg-white border-r border-zinc-100 min-h-screen py-6 px-4">
      <Link href="/" className="flex items-center gap-2 mb-10 px-2">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#E63B2E]">
          <svg viewBox="0 0 32 32" fill="none" className="h-5 w-5">
            <ellipse cx="16" cy="20" rx="12" ry="5" fill="white" opacity="0.9" />
            <path d="M4 20 Q16 8 28 20" stroke="white" strokeWidth="2.5" fill="none" />
            <rect x="13" y="6" width="6" height="3" rx="1.5" fill="white" />
          </svg>
        </span>
        <span>
          <p className="text-base font-black leading-4 text-[#121316]">NomNom</p>
          <p className="text-xs text-zinc-400">Swift delivery</p>
        </span>
      </Link>

      <nav className="flex flex-col gap-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = path === href || (href !== "/admin" && path.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-[#121316] text-white"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
