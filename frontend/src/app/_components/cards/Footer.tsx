import Link from "next/link";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#121316] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#E63B2E]">
                <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6">
                  <ellipse cx="16" cy="20" rx="12" ry="5" fill="white" opacity="0.9" />
                  <path d="M4 20 Q16 8 28 20" stroke="white" strokeWidth="2.5" fill="none" />
                  <rect x="13" y="6" width="6" height="3" rx="1.5" fill="white" />
                </svg>
              </span>
              <span>
                <span className="block text-lg font-black leading-5">
                  Nom<span className="text-[#E63B2E]">Nom</span>
                </span>
                <span className="text-xs text-zinc-500">Swift delivery</span>
              </span>
            </Link>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
              NomNom
            </p>
            <ul className="space-y-3 text-sm text-zinc-400">
              {["Home", "Contact us", "Delivery zone"].map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
              Menu
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-zinc-400">
              {[
                "Appetizers", "Side dish",
                "Salads", "Brunch",
                "Pizzas", "Desserts",
                "Main dishes", "Beverages",
                "Desserts", "Fish & Sea foods",
              ].map((item, i) => (
                <Link key={i} href="#" className="hover:text-white transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
              Follow us
            </p>
            <div className="flex gap-4">
              <Link href="#" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <FacebookIcon />
              </Link>
              <Link href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <InstagramIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 text-xs text-zinc-500">
          <p>Copyright 2024 © Nomnom LLC</p>
          <div className="flex gap-6">
            {["Privacy policy", "Terms and condition", "Cookie policy"].map((item) => (
              <Link key={item} href="#" className="hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
