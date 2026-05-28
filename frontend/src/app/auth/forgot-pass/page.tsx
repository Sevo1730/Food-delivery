"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/_components/cards/Header";
import FirstStep from "@/app/_components/forgotpasssteps/FirstStep";
import SecondStep from "@/app/_components/forgotpasssteps/SecondStep";

export default function ForgotPassPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <main className="min-h-screen bg-[#3d3d3b]">
      <Header />
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl shadow-black/20">
          <div className="mb-6 flex gap-2">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  s <= step ? "bg-[#E63B2E]" : "bg-zinc-200"
                }`}
              />
            ))}
          </div>

          {step === 1 && (
            <FirstStep
              onNext={(e) => {
                setEmail(e);
                setStep(2);
              }}
            />
          )}
          {step === 2 && (
            <SecondStep email={email} onSuccess={() => router.push("/auth/login")} />
          )}
        </div>
      </div>
    </main>
  );
}
