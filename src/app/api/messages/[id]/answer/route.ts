import { apiError, apiOk } from "@/lib/api";
import { answerSchema } from "@/lib/validators";

type AnswerRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(request: Request, context: AnswerRouteContext) {
  const { id } = await context.params;
  const payload = await request.json().catch(() => null);
  const parsed = answerSchema.safeParse(payload);

  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Resposta invalida.");
  }

  return apiOk(
    {
      answer: {
        id: `answer_${id}`,
        messageId: id,
        answerText: parsed.data.answerText,
        createdAt: new Date().toISOString()
      }
    },
    { status: 201 }
  );
}
