import Link from "next/link";
import Header from "@/app/_components/cards/Header";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#3d3d3b]">
      <Header />
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-2xl shadow-black/20">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <svg viewBox="0 0 48 48" fill="none" className="h-12 w-12" aria-hidden>
              <circle cx="24" cy="24" r="24" fill="#22c55e" />
              <path d="M14 25l7 7 13-14" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#E63B2E] mb-2">Баярлалаа!</p>
          <h1 className="text-4xl font-black text-[#121316] mb-3">Захиалга амжилттай!</h1>
          <p className="text-zinc-500 leading-relaxed mb-8">
            Таны захиалга хүлээн авагдлаа. Дундажаар{" "}
            <span className="font-bold text-[#121316]">30–45 минут</span> болно.
          </p>
          <div className="mb-8 rounded-2xl bg-zinc-50 p-5 text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Захиалгын дугаар</p>
            <p className="text-2xl font-black text-[#E63B2E]">#NN-{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/" className="block w-full rounded-full bg-[#E63B2E] py-4 font-black text-white hover:bg-red-600 transition-colors">
              Нүүр хуудас руу буцах
            </Link>
            <Link href="/" className="block w-full rounded-full border border-zinc-200 py-4 font-bold text-zinc-600 hover:bg-zinc-50 transition-colors">
              Дахин захиалах
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
