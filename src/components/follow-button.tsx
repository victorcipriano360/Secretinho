"use client";

import { UserMinus, UserPlus } from "lucide-react";
import { useState } from "react";

export function FollowButton() {
  const [following, setFollowing] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFollowing((value) => !value)}
      className="inline-flex h-10 items-center gap-2 rounded-md bg-zinc-950 px-3 text-sm font-medium text-white transition hover:bg-zinc-800"
    >
      {following ? <UserMinus size={16} /> : <UserPlus size={16} />}
      {following ? "Seguindo" : "Seguir"}
    </button>
  );
}
