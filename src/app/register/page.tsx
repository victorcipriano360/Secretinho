import Link from "next/link";
import { UserRoundPlus } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md space-y-5">
      <div>
        <p className="text-sm font-semibold text-rose-700">Cadastro</p>
        <h1 className="mt-1 text-3xl font-bold text-zinc-950">Crie sua conta</h1>
        <p className="mt-2 text-sm text-zinc-700">Depois do cadastro, o fluxo esperado leva para configurar o perfil.</p>
      </div>
      <form className="space-y-4 rounded-lg border border-black/10 bg-white p-5 shadow-sm">
        <label className="block">
          <span className="text-sm font-medium text-zinc-800">E-mail</span>
          <input
            type="email"
            className="mt-2 h-11 w-full rounded-md border border-black/10 bg-zinc-50 px-3 text-sm outline-none focus:border-rose-500 focus:bg-white"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-zinc-800">Senha</span>
          <input
            type="password"
            className="mt-2 h-11 w-full rounded-md border border-black/10 bg-zinc-50 px-3 text-sm outline-none focus:border-rose-500 focus:bg-white"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-zinc-800">Confirmar senha</span>
          <input
            type="password"
            className="mt-2 h-11 w-full rounded-md border border-black/10 bg-zinc-50 px-3 text-sm outline-none focus:border-rose-500 focus:bg-white"
          />
        </label>
        <button
          type="button"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-rose-600 px-4 text-sm font-medium text-white hover:bg-rose-700"
        >
          <UserRoundPlus size={16} />
          Criar conta
        </button>
        <p className="text-center text-sm text-zinc-600">
          Ja tem conta?{" "}
          <Link href="/login" className="font-semibold text-rose-700">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}
