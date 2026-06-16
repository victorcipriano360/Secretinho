import { notFound } from "next/navigation";

import { AnonymousMessageBox } from "@/components/anonymous-message-box";
import { Avatar } from "@/components/avatar";
import { FollowButton } from "@/components/follow-button";
import { MessageList } from "@/components/message-list";
import { getMessagesForUser, getProfileByUsername } from "@/lib/mock-data";

type PublicProfilePageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);

  if (!decodedUsername.startsWith("@")) {
    notFound();
  }

  const profile = getProfileByUsername(decodedUsername);

  if (!profile) {
    notFound();
  }

  const profileMessages = getMessagesForUser(profile.userId);

  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <aside className="space-y-4">
        <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <Avatar profile={profile} size="lg" />
            <FollowButton />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-zinc-950">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-zinc-600">@{profile.username}</p>
          <p className="mt-3 text-sm text-zinc-700">{profile.bio}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-md bg-zinc-50 p-3">
              <p className="text-2xl font-bold text-zinc-950">{profile.followers}</p>
              <p className="text-sm text-zinc-600">seguidores</p>
            </div>
            <div className="rounded-md bg-zinc-50 p-3">
              <p className="text-2xl font-bold text-zinc-950">{profile.following}</p>
              <p className="text-sm text-zinc-600">seguindo</p>
            </div>
          </div>
        </section>
        <AnonymousMessageBox />
      </aside>

      <section className="space-y-3">
        <div>
          <h2 className="text-xl font-bold text-zinc-950">Mensagens publicas</h2>
          <p className="text-sm text-zinc-600">O remetente nunca aparece publicamente.</p>
        </div>
        <MessageList messages={profileMessages} />
      </section>
    </div>
  );
}
