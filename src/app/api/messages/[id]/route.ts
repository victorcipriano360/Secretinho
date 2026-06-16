import { apiOk } from "@/lib/api";

type MessageRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_request: Request, context: MessageRouteContext) {
  const { id } = await context.params;

  return apiOk({
    deletedMessageId: id
  });
}
