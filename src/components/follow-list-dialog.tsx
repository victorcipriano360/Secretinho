"use client";

import Link from "next/link";
import { X } from "lucide-react";

import { Avatar } from "@/components/avatar";
import { FollowButton } from "@/components/follow-button";
import { useLocalFollows } from "@/lib/use-local-follows";
import type { Profile } from "@/lib/types";

type FollowListDialogProps = {
  profile: Profile;
  listType: "followers" | "following";
  basePath: string;
};

export function FollowListDialog({ profile, listType, basePath }: FollowListDialogProps) {
  const { followers, following } = useLocalFollows(profile.userId);
  const listedProfiles = listType === "followers" ? followers : following;
  const title = listType === "followers" ? "Seguidores" : "Seguindo";

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-zinc-950/45 p-4">
      <section className="w-full max-w-lg rounded-lg border border-black/10 bg-white shadow-xl">
        <header className="flex items-start justify-between gap-4 border-b border-black/10 p-4">
          <div>
            <p className="text-sm font-semibold text-rose-700">@{profile.username}</p>
            <h2 className="text-xl font-bold text-zinc-950">{title}</h2>
          </div>
          <Link
            href={basePath}
            scroll={false}
            className="rounded-md border border-black/10 p-2 text-zinc-600 transition hover:bg-zinc-100"
            aria-label="Fechar"
            title="Fechar"
          >
            <X size={18} />
          </Link>
        </header>

        <div className="max-h-[70vh] space-y-3 overflow-y-auto p-4">
          {listedProfiles.length === 0 ? (
            <div className="rounded-lg border border-dashed border-black/20 bg-zinc-50 p-6 text-center text-sm text-zinc-600">
              Nenhum perfil por enquanto.
            </div>
          ) : (
            listedProfiles.map((listedProfile) => (
              <article key={listedProfile.id} className="rounded-lg border border-black/10 bg-white p-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <Link href={`/@${listedProfile.username}`} className="flex min-w-0 flex-1 items-center gap-3">
                    <Avatar profile={listedProfile} />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-zinc-950">
                        {listedProfile.firstName} {listedProfile.lastName}
                      </span>
                      <span className="block truncate text-sm text-zinc-600">@{listedProfile.username}</span>
                    </span>
                  </Link>
                  <FollowButton targetUserId={listedProfile.userId} />
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
