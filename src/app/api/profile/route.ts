import { apiError, apiOk } from "@/lib/api";
import { usernameSchema } from "@/lib/validators";

export async function PATCH(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload) {
    return apiError("Envie os dados do perfil.");
  }

  if (payload.username) {
    const parsedUsername = usernameSchema.safeParse(payload.username);

    if (!parsedUsername.success) {
      return apiError(parsedUsername.error.issues[0]?.message ?? "Username invalido.");
    }
  }

  return apiOk({
    profile: payload,
    message: "Contrato de perfil validado. Falta persistir no banco."
  });
}
