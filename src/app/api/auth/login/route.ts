import { loginSchema } from "@/lib/validators";
import { apiError, apiOk } from "@/lib/api";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(payload);

  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Dados invalidos.");
  }

  return apiOk({
    nextStep: "/",
    message: "Contrato de login validado. Conecte a verificacao de senha quando o banco estiver pronto."
  });
}
