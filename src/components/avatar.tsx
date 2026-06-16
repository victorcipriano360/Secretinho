import Image from "next/image";

import type { Profile } from "@/lib/types";

type AvatarProps = {
  profile: Profile;
  size?: "sm" | "md" | "lg";
};

const sizeClass = {
  sm: "h-10 w-10 text-sm",
  md: "h-14 w-14 text-lg",
  lg: "h-24 w-24 text-3xl"
};

export function Avatar({ profile, size = "md" }: AvatarProps) {
  const initials = `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();

  if (profile.photoUrl) {
    return (
      <Image
        src={profile.photoUrl}
        alt={`Foto de ${profile.firstName}`}
        width={size === "lg" ? 96 : size === "md" ? 56 : 40}
        height={size === "lg" ? 96 : size === "md" ? 56 : 40}
        unoptimized
        className={`${sizeClass[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div className={`${sizeClass[size]} grid shrink-0 place-items-center rounded-full bg-rose-600 text-white`}>
      {initials}
    </div>
  );
}
