export default function MarqueeTicker() {
  const items = Array.from({ length: 10 }, () => "Fresh fast delivered  ·  ");
  return (
    <div className="overflow-hidden bg-[#E63B2E] py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="text-lg font-black uppercase text-white mx-4">{item}</span>
        ))}
        {items.map((item, i) => (
          <span key={`dup-${i}`} className="text-lg font-black uppercase text-white mx-4">{item}</span>
        ))}
      </div>
    </div>
  );
}
