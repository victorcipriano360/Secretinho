"use client";

import Link from "next/link";
import { Home, MessageCircle, Search, User } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/social", label: "Socializar", icon: Search },
  { href: "/messages", label: "Mensagens", icon: MessageCircle },
  { href: "/profile", label: "Perfil", icon: User }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-black/10 bg-white/95 px-2 py-2 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-xs ${
                active ? "bg-zinc-950 text-white" : "text-zinc-600"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
