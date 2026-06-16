"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { ProfileCard } from "@/components/profile-card";
import type { Profile } from "@/lib/types";

type SearchProfilesProps = {
  profiles: Profile[];
  placeholder?: string;
};

export function SearchProfiles({ profiles, placeholder = "Buscar por nome ou @" }: SearchProfilesProps) {
  const [query, setQuery] = useState("");

  const filteredProfiles = useMemo(() => {
    const normalized = query.trim().replace(/^@/, "").toLowerCase();

    if (!normalized) {
      return profiles;
    }

    return profiles.filter((profile) => {
      const fullName = `${profile.firstName} ${profile.lastName}`.toLowerCase();

      return fullName.includes(normalized) || profile.username.includes(normalized);
    });
  }, [profiles, query]);

  return (
    <section className="space-y-4">
      <label className="flex h-12 items-center gap-3 rounded-lg border border-black/10 bg-white px-4 shadow-sm">
        <Search size={18} className="text-zinc-500" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="h-full flex-1 bg-transparent text-sm outline-none"
        />
      </label>
      <div className="grid gap-3 md:grid-cols-2">
        {filteredProfiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </section>
  );
}
