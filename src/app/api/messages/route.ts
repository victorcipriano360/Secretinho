import { headers } from "next/headers";

import { apiError, apiOk } from "@/lib/api";
import { anonymousMessageSchema } from "@/lib/validators";

const recentAnonymousSends = new Map<string, number>();
const RATE_LIMIT_MS = 30_000;

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = anonymousMessageSchema.safeParse(payload);

  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Mensagem invalida.");
  }

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const now = Date.now();
  const lastSend = recentAnonymousSends.get(ip) ?? 0;

  if (now - lastSend < RATE_LIMIT_MS) {
    return apiError("Aguarde um pouco antes de enviar outra mensagem.", 429);
  }

  recentAnonymousSends.set(ip, now);

  return apiOk(
    {
      message: {
        id: `mock_${now}`,
        ...parsed.data,
        createdAt: new Date(now).toISOString()
      }
    },
    { status: 201 }
  );
}
