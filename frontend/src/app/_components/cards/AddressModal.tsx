"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (address: string) => void;
  initialAddress?: string;
}

export default function AddressModal({ open, onClose, onSave, initialAddress = "" }: Props) {
  const [address, setAddress] = useState(initialAddress);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      setAddress(initialAddress);
      setTimeout(() => textareaRef.current?.focus(), 300);
    }
  }, [open, initialAddress]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
        aria-hidden
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
        <div className="w-full max-w-lg rounded-3xl bg-white px-6 pt-6 pb-8 shadow-2xl">
          <div className="flex items-start justify-between mb-5">
            <h2 className="text-2xl font-black text-[#121316] leading-snug max-w-[75%]">
              Please write your delivery address!
            </h2>
            <button
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <textarea
            ref={textareaRef}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Please share your complete address"
            rows={4}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm text-zinc-700 placeholder:text-zinc-400 outline-none focus:border-zinc-400 resize-none transition"
          />

          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-full border border-zinc-200 py-4 text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (address.trim()) {
                  onSave(address.trim());
                  onClose();
                }
              }}
              className="flex-1 rounded-full bg-[#121316] py-4 text-sm font-black text-white hover:bg-zinc-800 transition-colors"
            >
              Deliver Here
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
