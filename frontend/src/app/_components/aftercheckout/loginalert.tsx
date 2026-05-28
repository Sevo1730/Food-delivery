"use client";

import Link from "next/link";

interface Props {
  onClose?: () => void;
}

export default function LoginAlert({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0ee]">
          <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
            <circle cx="12" cy="12" r="10" stroke="#E63B2E" strokeWidth="2" />
            <path d="M12 8v4M12 16h.01" stroke="#E63B2E" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-[#121316] mb-2">Нэвтрэх шаардлагатай</h3>
        <p className="text-sm text-zinc-500 mb-6">
          Захиалга хийхийн тулд эхлээд нэвтэрнэ үү.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/auth/login"
            className="block w-full rounded-full bg-[#E63B2E] py-3 font-black text-white hover:bg-red-600"
          >
            Нэвтрэх
          </Link>
          <Link
            href="/auth/register"
            className="block w-full rounded-full border border-zinc-200 py-3 font-bold text-zinc-600 hover:bg-zinc-50"
          >
            Бүртгүүлэх
          </Link>
          {onClose && (
            <button
              onClick={onClose}
              className="text-sm text-zinc-400 hover:text-zinc-600"
            >
              Болих
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
