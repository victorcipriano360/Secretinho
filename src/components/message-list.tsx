import { Trash2 } from "lucide-react";

import { AnswerComposer } from "@/components/answer-composer";
import { formatDateTime } from "@/lib/date";
import type { AnonymousMessage } from "@/lib/types";

type MessageListProps = {
  messages: AnonymousMessage[];
  ownerView?: boolean;
};

export function MessageList({ messages, ownerView = false }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-black/20 bg-white p-8 text-center text-sm text-zinc-600">
        Nenhuma mensagem por enquanto.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <article key={message.id} className="rounded-lg border border-black/10 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">Anonimo</p>
              <p className="mt-2 text-zinc-950">{message.messageText}</p>
              <p className="mt-2 text-xs text-zinc-500">{formatDateTime(message.createdAt)}</p>
            </div>
            {ownerView ? (
              <button
                type="button"
                className="rounded-md border border-black/10 p-2 text-zinc-500 transition hover:bg-red-50 hover:text-red-600"
                aria-label="Apagar mensagem"
                title="Apagar"
              >
                <Trash2 size={16} />
              </button>
            ) : null}
          </div>
          {message.answer ? (
            <div className="mt-4 rounded-md bg-amber-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">Resposta</p>
              <p className="mt-2 text-sm text-zinc-950">{message.answer.answerText}</p>
              <p className="mt-2 text-xs text-zinc-500">{formatDateTime(message.answer.createdAt)}</p>
            </div>
          ) : ownerView ? (
            <AnswerComposer />
          ) : null}
        </article>
      ))}
    </div>
  );
}
