import { SearchProfiles } from "@/components/search-profiles";
import { currentUser, profiles } from "@/lib/mock-data";

export default function SocialPage() {
  const socialProfiles = profiles.filter((profile) => profile.id !== currentUser.profile.id);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold text-rose-700">Socializar</p>
        <h1 className="mt-1 text-3xl font-bold text-zinc-950">Descubra perfis para seguir</h1>
        <p className="mt-2 max-w-2xl text-zinc-700">
          Aqui ficam recomendações, pesquisa por nome e acesso rápido aos perfis públicos.
        </p>
      </div>
      <SearchProfiles profiles={socialProfiles} />
    </div>
  );
}
