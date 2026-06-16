import Link from "next/link";
import { Settings } from "lucide-react";

import { Avatar } from "@/components/avatar";
import { MessageList } from "@/components/message-list";
import { currentUser, getMessagesForUser } from "@/lib/mock-data";

export default function ProfilePage() {
  const profile = currentUser.profile;
  const inbox = getMessagesForUser(currentUser.id);

  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar profile={profile} size="lg" />
            <div>
              <p className="text-sm font-semibold text-rose-700">Meu perfil</p>
              <h1 className="text-3xl font-bold text-zinc-950">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-zinc-600">@{profile.username}</p>
            </div>
          </div>
          <Link
            href="/settings"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-black/10 bg-white px-3 text-sm font-medium text-zinc-800 hover:bg-zinc-100"
          >
            <Settings size={16} />
            Editar
          </Link>
        </div>
        <dl className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-md bg-zinc-50 p-3">
            <dt className="text-xs text-zinc-500">E-mail privado</dt>
            <dd className="mt-1 font-medium text-zinc-950">{currentUser.email}</dd>
          </div>
          <div className="rounded-md bg-zinc-50 p-3">
            <dt className="text-xs text-zinc-500">Seguidores</dt>
            <dd className="mt-1 font-medium text-zinc-950">{profile.followers}</dd>
          </div>
          <div className="rounded-md bg-zinc-50 p-3">
            <dt className="text-xs text-zinc-500">Seguindo</dt>
            <dd className="mt-1 font-medium text-zinc-950">{profile.following}</dd>
          </div>
        </dl>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-950">Minhas mensagens publicas</h2>
        <MessageList messages={inbox} ownerView />
      </section>
    </div>
  );
}
