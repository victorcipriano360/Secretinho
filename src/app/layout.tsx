import type { Metadata } from "next";

import { BottomNav } from "@/components/bottom-nav";
import { TopNav } from "@/components/top-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Secretinho",
  description: "Rede social de mensagens anonimas."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <TopNav />
        <main className="mx-auto min-h-[calc(100vh-65px)] max-w-6xl px-4 py-6 pb-24 md:pb-10">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
