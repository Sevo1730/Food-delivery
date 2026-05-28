import { MenuItem } from "@/types";
import MenuCard from "./MenuCard";

interface Props {
  title: string;
  items: MenuItem[];
}

export default function MenuSection({ title, items }: Props) {
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-3xl font-black text-white">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
