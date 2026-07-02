"use client";

import { ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";

import { AnswerComposer } from "@/components/answer-composer";
import { QuestionExpiration } from "@/components/question-expiration";
import { formatDateTime } from "@/lib/date";
import { currentUser } from "@/lib/mock-data";
import type { AnonymousMessage } from "@/lib/types";

type MessageListProps = {
  messages: AnonymousMessage[];
  ownerView?: boolean;
  onAnswer?: (messageId: string, answerText: string) => void;
  onDelete?: (messageId: string) => void;
  onDeleteAnswer?: (messageId: string) => void;
  onReact?: (messageId: string, reactionType: "up" | "down") => void;
};

export function MessageList({
  messages,
  ownerView = false,
  onAnswer,
  onDelete,
  onDeleteAnswer,
  onReact
}: MessageListProps) {
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
        <article key={message.id} className="rounded-lg border border-rose-200 bg-rose-50/70 p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-800">Pergunta anônima</p>
              <p className="mt-2 text-zinc-950">{message.messageText}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-600">
                <span>enviada em {formatDateTime(message.createdAt)}</span>
                <QuestionExpiration expiresAt={message.expiresAt} />
              </div>
            </div>
            {ownerView ? (
              <button
                type="button"
                onClick={() => onDelete?.(message.id)}
                className="inline-flex h-9 shrink-0 items-center gap-2 rounded-md border border-red-200 bg-white px-3 text-xs font-medium text-red-700 transition hover:bg-red-50"
                aria-label="Apagar pergunta e resposta"
                title="Apagar pergunta e resposta"
              >
                <Trash2 size={16} />
                <span className="hidden sm:inline">Pergunta + resposta</span>
              </button>
            ) : null}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-rose-200 pt-3">
            {(["up", "down"] as const).map((reactionType) => {
              const selected = message.reactions?.some(
                (reaction) => reaction.userId === currentUser.id && reaction.type === reactionType
              );
              const count = message.reactions?.filter((reaction) => reaction.type === reactionType).length ?? 0;
              const Icon = reactionType === "up" ? ThumbsUp : ThumbsDown;
              const label = reactionType === "up" ? "Gostei" : "Não gostei";

              return (
                <button
                  key={reactionType}
                  type="button"
                  onClick={() => onReact?.(message.id, reactionType)}
                  className={`inline-flex h-9 items-center gap-2 rounded-md border px-3 text-xs font-medium transition ${
                    selected
                      ? "border-zinc-950 bg-zinc-950 text-white"
                      : "border-black/10 bg-white text-zinc-700 hover:bg-zinc-100"
                  }`}
                  aria-label={label}
                  title={label}
                >
                  <Icon size={15} />
                  {count}
                </button>
              );
            })}
          </div>
          {message.answer ? (
            <div className="mt-4 rounded-md border border-teal-200 bg-teal-50 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">Sua resposta</p>
                  <p className="mt-2 text-sm text-zinc-950">{message.answer.answerText}</p>
                  <p className="mt-2 text-xs text-zinc-600">{formatDateTime(message.answer.createdAt)}</p>
                </div>
                {ownerView ? (
                  <button
                    type="button"
                    onClick={() => onDeleteAnswer?.(message.id)}
                    className="inline-flex h-9 shrink-0 items-center gap-2 rounded-md border border-teal-300 bg-white px-3 text-xs font-medium text-teal-800 transition hover:bg-teal-100"
                    aria-label="Apagar somente resposta"
                    title="Apagar somente resposta"
                  >
                    <Trash2 size={16} />
                    <span className="hidden sm:inline">Resposta</span>
                  </button>
                ) : null}
              </div>
            </div>
          ) : ownerView ? (
            <AnswerComposer onAnswer={(answerText) => onAnswer?.(message.id, answerText)} />
          ) : null}
        </article>
      ))}
    </div>
  );
}
