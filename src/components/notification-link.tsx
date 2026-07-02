"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

import { useLocalNotifications } from "@/lib/use-local-messages";

type NotificationLinkProps = {
  compact?: boolean;
  active?: boolean;
};

export function NotificationLink({ compact = false, active = false }: NotificationLinkProps) {
  const { unreadCount } = useLocalNotifications();

  if (compact) {
    return (
      <Link
        href="/notifications"
        className={`relative flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-xs ${
          active ? "bg-zinc-950 text-white" : "text-zinc-600"
        }`}
      >
        <Bell size={18} />
        <span>Alertas</span>
        {unreadCount > 0 ? (
          <span className="absolute right-4 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        ) : null}
      </Link>
    );
  }

  return (
    <Link className="relative rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100" href="/notifications">
      Notificações
      {unreadCount > 0 ? (
        <span className="ml-2 inline-grid h-5 min-w-5 place-items-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white">
          {unreadCount}
        </span>
      ) : null}
    </Link>
  );
}
