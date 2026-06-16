import { apiError, apiOk } from "@/lib/api";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const followingId = payload?.followingId;

  if (!followingId || typeof followingId !== "string") {
    return apiError("Informe o perfil que sera seguido.");
  }

  return apiOk({
    followingId,
    following: true
  });
}

export async function DELETE(request: Request) {
  const payload = await request.json().catch(() => null);
  const followingId = payload?.followingId;

  if (!followingId || typeof followingId !== "string") {
    return apiError("Informe o perfil que deixara de ser seguido.");
  }

  return apiOk({
    followingId,
    following: false
  });
}
