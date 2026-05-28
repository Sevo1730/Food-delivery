"use client";

import { useRouter } from "next/navigation";
import Header from "@/app/_components/cards/Header";
import SecondStep from "@/app/_components/forgotpasssteps/SecondStep";

export default function ResetPassPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-[#3d3d3b]">
      <Header />
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl shadow-black/20">
          <SecondStep email="" onSuccess={() => router.push("/auth/login")} />
        </div>
      </div>
    </main>
  );
}
