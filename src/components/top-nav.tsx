import Link from "next/link";
import { MessageCircleHeart } from "lucide-react";

import { NotificationLink } from "@/components/notification-link";

export function TopNav() {
  return (
    <header className="sticky top-0 z-10 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-zinc-950">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-rose-600 text-white">
            <MessageCircleHeart size={20} />
          </span>
          Secretinho
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          <Link className="rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100" href="/">
            Início
          </Link>
          <Link className="rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100" href="/social">
            Socializar
          </Link>
          <Link className="rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100" href="/messages">
            Mensagens
          </Link>
          <NotificationLink />
          <Link className="rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100" href="/profile">
            Perfil
          </Link>
        </nav>
      </div>
    </header>
  );
}
