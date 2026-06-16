import { Save } from "lucide-react";

import { currentUser } from "@/lib/mock-data";

export default function SettingsPage() {
  const profile = currentUser.profile;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div>
        <p className="text-sm font-semibold text-rose-700">Configuracao de perfil</p>
        <h1 className="mt-1 text-3xl font-bold text-zinc-950">Ajuste seus dados publicos</h1>
        <p className="mt-2 text-zinc-700">O e-mail fica privado. Nome, sobrenome, foto e @ aparecem no perfil publico.</p>
      </div>
      <form className="space-y-4 rounded-lg border border-black/10 bg-white p-5 shadow-sm">
        <label className="block">
          <span className="text-sm font-medium text-zinc-800">Nome publico</span>
          <input
            defaultValue={profile.firstName}
            className="mt-2 h-11 w-full rounded-md border border-black/10 bg-zinc-50 px-3 text-sm outline-none focus:border-rose-500 focus:bg-white"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-zinc-800">Sobrenome publico</span>
          <input
            defaultValue={profile.lastName}
            className="mt-2 h-11 w-full rounded-md border border-black/10 bg-zinc-50 px-3 text-sm outline-none focus:border-rose-500 focus:bg-white"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-zinc-800">@ do usuario</span>
          <input
            defaultValue={profile.username}
            className="mt-2 h-11 w-full rounded-md border border-black/10 bg-zinc-50 px-3 text-sm outline-none focus:border-rose-500 focus:bg-white"
          />
          <span className="mt-2 block text-xs text-zinc-500">Use letras, numeros ou underline, sem espacos.</span>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-zinc-800">Foto de perfil</span>
          <input
            placeholder="URL da foto"
            className="mt-2 h-11 w-full rounded-md border border-black/10 bg-zinc-50 px-3 text-sm outline-none focus:border-rose-500 focus:bg-white"
          />
        </label>
        <button
          type="button"
          className="inline-flex h-11 items-center gap-2 rounded-md bg-zinc-950 px-4 text-sm font-medium text-white hover:bg-zinc-800"
        >
          <Save size={16} />
          Salvar simulacao
        </button>
      </form>
    </div>
  );
}
