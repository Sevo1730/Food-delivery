import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/app/context/Cart-context";
import { AuthProvider } from "@/app/context/AuthProvider";
import { ToastProvider } from "@/app/context/ToastContext";
import { UIProvider } from "@/app/context/UIContext";
import GlobalModals from "@/app/_components/GlobalModals";

export const metadata: Metadata = {
  title: "NomNom — Swift Delivery",
  description: "Fresh food delivered fast to your door",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <UIProvider>
            <CartProvider>
              <ToastProvider>
                {children}
                <GlobalModals />
              </ToastProvider>
            </CartProvider>
          </UIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
