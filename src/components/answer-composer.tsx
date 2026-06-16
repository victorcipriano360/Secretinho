"use client";

import { Reply } from "lucide-react";
import { useState } from "react";

export function AnswerComposer() {
  const [answer, setAnswer] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <form
      className="mt-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (!answer.trim()) {
          return;
        }
        setSent(true);
      }}
    >
      <textarea
        value={answer}
        onChange={(event) => {
          setAnswer(event.target.value);
          setSent(false);
        }}
        maxLength={500}
        rows={3}
        placeholder="Responder uma unica vez..."
        className="w-full resize-none rounded-md border border-black/10 bg-zinc-50 p-3 text-sm outline-none transition focus:border-rose-500 focus:bg-white"
      />
      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-zinc-500">{answer.length}/500</p>
        <button
          type="submit"
          className="inline-flex h-10 items-center gap-2 rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          <Reply size={16} />
          Responder
        </button>
      </div>
      {sent ? <p className="mt-2 text-sm font-medium text-emerald-700">Resposta simulada salva.</p> : null}
    </form>
  );
}
