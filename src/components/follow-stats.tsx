"use client";

import Link from "next/link";

import { useLocalFollows } from "@/lib/use-local-follows";

type FollowStatsProps = {
  profileUserId: string;
  basePath: string;
};

export function FollowStats({ profileUserId, basePath }: FollowStatsProps) {
  const { followersCount, followingCount } = useLocalFollows(profileUserId);

  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      <Link
        href={`${basePath}?list=followers`}
        scroll={false}
        className="rounded-md bg-zinc-50 p-3 text-left transition hover:bg-zinc-100"
      >
        <p className="text-2xl font-bold text-zinc-950">{followersCount}</p>
        <p className="text-sm text-zinc-600">seguidores</p>
      </Link>
      <Link
        href={`${basePath}?list=following`}
        scroll={false}
        className="rounded-md bg-zinc-50 p-3 text-left transition hover:bg-zinc-100"
      >
        <p className="text-2xl font-bold text-zinc-950">{followingCount}</p>
        <p className="text-sm text-zinc-600">seguindo</p>
      </Link>
    </div>
  );
}
