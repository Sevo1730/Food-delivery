"use client";

import Header from "@/app/_components/cards/Header";
import HeroBanner from "@/app/_components/cards/HeroBanner";
import MenuSection from "@/app/_components/cards/MenuSection";
import MarqueeTicker from "@/app/_components/cards/MarqueeTicker";
import Footer from "@/app/_components/cards/Footer";
import { menuData, categories } from "@/lib/menuData";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#3d3d3b]">
      <Header />
      <HeroBanner />

      <div id="menu" className="mx-auto max-w-7xl px-6 py-16">
        {categories.map((category) => {
          const items = menuData.filter((item) => item.category === category);
          return <MenuSection key={category} title={category} items={items} />;
        })}
      </div>

      <MarqueeTicker />
      <Footer />
    </main>
  );
}
