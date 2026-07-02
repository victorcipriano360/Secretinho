"use client";

import { UserMinus, UserPlus } from "lucide-react";

import { useLocalFollows } from "@/lib/use-local-follows";

type FollowButtonProps = {
  targetUserId: string;
};

export function FollowButton({ targetUserId }: FollowButtonProps) {
  const { isFollowing, toggleFollow, canFollow } = useLocalFollows(targetUserId);
  const following = isFollowing(targetUserId);

  if (!canFollow) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => toggleFollow(targetUserId)}
      className="inline-flex h-10 items-center gap-2 rounded-md bg-zinc-950 px-3 text-sm font-medium text-white transition hover:bg-zinc-800"
    >
      {following ? <UserMinus size={16} /> : <UserPlus size={16} />}
      {following ? "Seguindo" : "Seguir"}
    </button>
  );
}
