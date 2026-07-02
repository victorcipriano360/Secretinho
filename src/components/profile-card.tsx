import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Avatar } from "@/components/avatar";
import { FollowButton } from "@/components/follow-button";
import { FollowStats } from "@/components/follow-stats";
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
        <div className="min-w-0 flex-1 [&>div]:mt-0 [&>div]:grid-cols-2 [&_a]:px-2 [&_a]:py-2 [&_p:first-child]:text-base">
          <FollowStats profileUserId={profile.userId} basePath={`/@${profile.username}`} />
        </div>
        {showFollow ? <FollowButton targetUserId={profile.userId} /> : null}
      </div>
    </article>
  );
}
