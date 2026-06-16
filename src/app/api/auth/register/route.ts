import { registerSchema } from "@/lib/validators";
import { apiError, apiOk } from "@/lib/api";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(payload);

  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Dados invalidos.");
  }

  return apiOk(
    {
      nextStep: "/settings",
      message: "Contrato de cadastro validado. Conecte Auth.js ou bcrypt + banco para persistir."
    },
    { status: 201 }
  );
}
