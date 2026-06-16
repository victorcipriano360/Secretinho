import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Avatar } from "@/components/avatar";
import { FollowButton } from "@/components/follow-button";
import type { Profile } from "@/lib/types";

type ProfileCardProps = {
  profile: Profile;
  showFollow?: boolean;
};

export function ProfileCard({ profile, showFollow = true }: ProfileCardProps) {
  return (
    <article className="rounded-lg border border-black/10 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar profile={profile} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-zinc-950">
            {profile.firstName} {profile.lastName}
          </h3>
          <p className="text-sm text-zinc-600">@{profile.username}</p>
          <p className="mt-2 line-clamp-2 text-sm text-zinc-700">{profile.bio}</p>
        </div>
        <Link
          href={`/@${profile.username}`}
          className="rounded-md border border-black/10 p-2 text-zinc-700 transition hover:bg-zinc-100"
          aria-label={`Abrir perfil de ${profile.firstName}`}
          title="Abrir perfil"
        >
          <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex gap-4 text-sm text-zinc-600">
          <span>
            <strong className="text-zinc-950">{profile.followers}</strong> seguidores
          </span>
          <span>
            <strong className="text-zinc-950">{profile.following}</strong> seguindo
          </span>
        </div>
        {showFollow ? <FollowButton /> : null}
      </div>
    </article>
  );
}
