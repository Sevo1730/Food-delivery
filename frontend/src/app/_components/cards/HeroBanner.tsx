import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="w-full">
      <Image
        src="/bg.png"
        alt="Today's Offer Banner"
        width={5760}
        height={2280}
        className="w-full h-auto block"
        priority
      />
    </section>
  );
}
