"use client";

import Link from "next/link";
import { Bell, CheckCheck } from "lucide-react";

import { formatDateTime } from "@/lib/date";
import { useLocalNotifications } from "@/lib/use-local-messages";

export function NotificationsPanel() {
  const { notifications, unreadCount, markNotificationAsRead, markAllNotificationsAsRead } = useLocalNotifications();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-rose-700">Notificações</p>
          <h1 className="mt-1 text-3xl font-bold text-zinc-950">Tudo que envolve o seu usuário</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            Perguntas recebidas, respostas às perguntas que você enviou e reações locais aparecem aqui.
          </p>
        </div>
        <button
          type="button"
          onClick={markAllNotificationsAsRead}
          disabled={unreadCount === 0}
          className="inline-flex h-10 items-center gap-2 rounded-md border border-black/10 bg-white px-3 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCheck size={16} />
          Marcar como lidas
        </button>
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-lg border border-dashed border-black/20 bg-white p-8 text-center text-sm text-zinc-600">
          <Bell className="mx-auto mb-3 text-zinc-400" size={28} />
          Nenhuma notificação por enquanto.
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Link
              key={notification.id}
              href={notification.href}
              onClick={() => markNotificationAsRead(notification.id)}
              className={`block rounded-lg border p-4 shadow-sm transition hover:bg-zinc-50 ${
                notification.read ? "border-black/10 bg-white" : "border-rose-200 bg-rose-50"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-zinc-950">{notification.title}</p>
                  <p className="mt-1 text-sm text-zinc-700">{notification.body}</p>
                  <p className="mt-2 text-xs text-zinc-500">{formatDateTime(notification.createdAt)}</p>
                </div>
                {!notification.read ? (
                  <span className="rounded-full bg-rose-600 px-2 py-1 text-xs font-bold text-white">Nova</span>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
