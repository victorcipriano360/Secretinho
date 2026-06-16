import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-black/10 bg-white p-8 text-center shadow-sm">
      <p className="text-sm font-semibold text-rose-700">404</p>
      <h1 className="mt-2 text-2xl font-bold text-zinc-950">Perfil nao encontrado</h1>
      <p className="mt-2 text-sm text-zinc-600">Confira o @ ou volte para buscar outros usuarios.</p>
      <Link
        href="/"
        className="mt-5 inline-flex h-10 items-center rounded-md bg-zinc-950 px-4 text-sm font-medium text-white"
      >
        Voltar ao inicio
      </Link>
    </div>
  );
}
