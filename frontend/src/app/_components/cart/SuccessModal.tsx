"use client";

import { useUI } from "@/app/context/UIContext";

export default function SuccessModal() {
  const { successOpen, closeSuccess } = useUI();

  if (!successOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/40" aria-hidden />
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl animate-fade-in">
          <p className="text-lg font-black text-[#121316] mb-6 leading-snug">
            Your order has been successfully placed !
          </p>

          <div className="flex justify-center mb-6">
            <svg viewBox="0 0 160 200" className="h-48 w-auto" fill="none">
              {/* String */}
              <path d="M80 90 Q75 130 72 170" stroke="#555" strokeWidth="2" strokeLinecap="round" />
              {/* Balloon - red circle */}
              <circle cx="80" cy="50" r="46" fill="#E63B2E" />
              {/* Dome/plate icon inside balloon */}
              <ellipse cx="80" cy="58" rx="22" ry="7" fill="white" opacity="0.9" />
              <path d="M58 58 Q80 40 102 58" stroke="white" strokeWidth="3" fill="none" />
              <rect x="74" y="32" width="12" height="6" rx="3" fill="white" />
              {/* Body */}
              <ellipse cx="72" cy="178" rx="10" ry="12" fill="#6B4F3A" />
              {/* Legs */}
              <rect x="65" y="188" width="6" height="10" rx="3" fill="#5B3F2A" />
              <rect x="73" y="188" width="6" height="10" rx="3" fill="#7C4A2E" />
              {/* Shirt */}
              <ellipse cx="72" cy="170" rx="11" ry="9" fill="#4A90D9" />
              {/* Head */}
              <circle cx="72" cy="155" r="12" fill="#C68642" />
              {/* Hair */}
              <path d="M60 152 Q62 140 72 138 Q82 140 84 152" fill="#2C1810" />
              <circle cx="66" cy="148" r="3" fill="#2C1810" />
              <circle cx="72" cy="146" r="3.5" fill="#2C1810" />
              <circle cx="78" cy="148" r="3" fill="#2C1810" />
              {/* Eyes */}
              <circle cx="68" cy="155" r="1.5" fill="#1a1a1a" />
              <circle cx="76" cy="155" r="1.5" fill="#1a1a1a" />
              {/* Mouth */}
              <path d="M68 160 Q72 163 76 160" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              {/* Arm holding string */}
              <path d="M82 170 Q88 160 80 150" stroke="#C68642" strokeWidth="5" strokeLinecap="round" />
              <path d="M62 170 Q55 162 58 155" stroke="#C68642" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>

          <button
            onClick={closeSuccess}
            className="w-full rounded-full border border-zinc-200 py-3.5 text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-colors"
          >
            Back to home
          </button>
        </div>
      </div>
    </>
  );
}
