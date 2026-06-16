import Link from "next/link";
import { Bell, MessageCircle, ShieldCheck } from "lucide-react";

import { ProfileCard } from "@/components/profile-card";
import { SearchProfiles } from "@/components/search-profiles";
import { currentUser, profiles } from "@/lib/mock-data";

export default function HomePage() {
  const recommended = profiles.filter((profile) => profile.id !== currentUser.profile.id);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-[1.25fr_0.75fr] md:items-stretch">
        <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-rose-700">Bem-vindo de volta</p>
          <h1 className="mt-2 text-3xl font-bold text-zinc-950">Seu mural anonimo esta tomando forma.</h1>
          <p className="mt-3 max-w-2xl text-zinc-700">
            Encontre perfis, envie perguntas anonimas e acompanhe respostas publicas. Esta versao usa dados de
            exemplo ate o banco ficar pronto.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/messages"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-zinc-950 px-4 text-sm font-medium text-white"
            >
              <MessageCircle size={17} />
              Ver mensagens
            </Link>
            <Link
              href={`/@${currentUser.profile.username}`}
              className="inline-flex h-11 items-center gap-2 rounded-md border border-black/10 bg-white px-4 text-sm font-medium text-zinc-800"
            >
              Abrir meu perfil publico
            </Link>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
          <div className="rounded-lg border border-black/10 bg-white p-4 shadow-sm">
            <Bell className="text-teal-700" size={20} />
            <p className="mt-3 text-2xl font-bold text-zinc-950">2</p>
            <p className="text-sm text-zinc-600">mensagens novas</p>
          </div>
          <div className="rounded-lg border border-black/10 bg-white p-4 shadow-sm">
            <ShieldCheck className="text-emerald-700" size={20} />
            <p className="mt-3 text-2xl font-bold text-zinc-950">500</p>
            <p className="text-sm text-zinc-600">caracteres por mensagem</p>
          </div>
          <div className="rounded-lg border border-black/10 bg-white p-4 shadow-sm">
            <MessageCircle className="text-rose-700" size={20} />
            <p className="mt-3 text-2xl font-bold text-zinc-950">1x</p>
            <p className="text-sm text-zinc-600">resposta por mensagem</p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-zinc-950">Buscar usuarios</h2>
            <p className="text-sm text-zinc-600">Digite um nome ou @ para abrir perfis publicos.</p>
          </div>
        </div>
        <SearchProfiles profiles={recommended} placeholder="Buscar por @ ou nome" />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-950">Sugestoes para conhecer</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {recommended.slice(0, 3).map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </section>
    </div>
  );
}
