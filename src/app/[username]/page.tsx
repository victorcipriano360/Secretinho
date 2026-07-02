import { notFound } from "next/navigation";

import { AnonymousMessageBox } from "@/components/anonymous-message-box";
import { Avatar } from "@/components/avatar";
import { FollowButton } from "@/components/follow-button";
import { FollowListDialog } from "@/components/follow-list-dialog";
import { FollowStats } from "@/components/follow-stats";
import { StoredMessageList } from "@/components/stored-message-list";
import { getProfileByUsername } from "@/lib/mock-data";

type PublicProfilePageProps = {
  params: Promise<{
    username: string;
  }>;
  searchParams: Promise<{
    list?: string;
  }>;
};

export default async function PublicProfilePage({ params, searchParams }: PublicProfilePageProps) {
  const { username } = await params;
  const { list } = await searchParams;
  const decodedUsername = decodeURIComponent(username);

  if (!decodedUsername.startsWith("@")) {
    notFound();
  }

  const profile = getProfileByUsername(decodedUsername);

  if (!profile) {
    notFound();
  }

  const basePath = `/@${profile.username}`;
  const listType = list === "followers" || list === "following" ? list : null;

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="space-y-4">
          <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <Avatar profile={profile} size="lg" />
              <FollowButton targetUserId={profile.userId} />
            </div>
            <h1 className="mt-4 text-3xl font-bold text-zinc-950">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-zinc-600">@{profile.username}</p>
            <p className="mt-3 text-sm text-zinc-700">{profile.bio}</p>
            <FollowStats profileUserId={profile.userId} basePath={basePath} />
          </section>
          <AnonymousMessageBox receiverUserId={profile.userId} />
        </aside>

        <section className="space-y-3">
          <div>
            <h2 className="text-xl font-bold text-zinc-950">Mensagens públicas</h2>
            <p className="text-sm text-zinc-600">O remetente nunca aparece publicamente.</p>
          </div>
          <StoredMessageList receiverUserId={profile.userId} />
        </section>
      </div>
      {listType ? <FollowListDialog profile={profile} listType={listType} basePath={basePath} /> : null}
    </>
  );
}
