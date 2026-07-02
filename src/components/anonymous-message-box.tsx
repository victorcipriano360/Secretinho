"use client";

import { Send } from "lucide-react";
import { useState } from "react";

import { useLocalMessages } from "@/lib/use-local-messages";

type AnonymousMessageBoxProps = {
  receiverUserId: string;
};

export function AnonymousMessageBox({ receiverUserId }: AnonymousMessageBoxProps) {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const { sendMessage } = useLocalMessages(receiverUserId);

  return (
    <form
      className="rounded-lg border border-black/10 bg-white p-4 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        if (!message.trim()) {
          return;
        }
        sendMessage(message);
        setSent(true);
        setMessage("");
      }}
    >
      <label className="text-sm font-semibold text-zinc-950" htmlFor="anonymous-message">
        Enviar mensagem anônima
      </label>
      <textarea
        id="anonymous-message"
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
          setSent(false);
        }}
        maxLength={500}
        rows={4}
        placeholder="Escreva algo sem revelar quem você é..."
        className="mt-3 w-full resize-none rounded-md border border-black/10 bg-zinc-50 p-3 text-sm outline-none transition focus:border-rose-500 focus:bg-white"
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs text-zinc-500">{message.length}/500</p>
        <button
          type="submit"
          className="inline-flex h-10 items-center gap-2 rounded-md bg-rose-600 px-4 text-sm font-medium text-white transition hover:bg-rose-700"
        >
          <Send size={16} />
          Enviar
        </button>
      </div>
      {sent ? <p className="mt-3 text-sm font-medium text-emerald-700">Mensagem enviada para este perfil.</p> : null}
    </form>
  );
}
