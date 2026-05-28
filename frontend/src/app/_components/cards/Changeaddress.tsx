"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";

interface Props {
  currentAddress?: string;
  onSave?: (address: string) => void;
}

export default function Changeaddress({ currentAddress = "", onSave }: Props) {
  const [address, setAddress] = useState(currentAddress);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-lg">
      <div className="mb-3 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-[#E63B2E]" />
        <h3 className="font-black text-[#121316]">Хүргэлтийн хаяг</h3>
      </div>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Хаяг оруулна уу..."
        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-[#E63B2E]"
      />
      <button
        onClick={() => onSave?.(address)}
        className="mt-3 w-full rounded-full bg-[#E63B2E] py-3 text-sm font-black text-white hover:bg-red-600"
      >
        Хаяг хадгалах
      </button>
    </div>
  );
}
