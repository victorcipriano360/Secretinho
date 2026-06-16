import Link from "next/link";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-5">
      <div>
        <p className="text-sm font-semibold text-rose-700">Entrar</p>
        <h1 className="mt-1 text-3xl font-bold text-zinc-950">Acesse sua conta</h1>
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
        <button
          type="button"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 text-sm font-medium text-white hover:bg-zinc-800"
        >
          <LogIn size={16} />
          Entrar
        </button>
        <p className="text-center text-sm text-zinc-600">
          Nao tem conta?{" "}
          <Link href="/register" className="font-semibold text-rose-700">
            Criar cadastro
          </Link>
        </p>
      </form>
    </div>
  );
}
