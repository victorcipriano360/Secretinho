import { MessageList } from "@/components/message-list";
import { currentUser, getMessagesForUser } from "@/lib/mock-data";

export default function MessagesPage() {
  const inbox = getMessagesForUser(currentUser.id);

  return (
    <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
      <aside className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-rose-700">Mensagens recebidas</p>
        <h1 className="mt-1 text-3xl font-bold text-zinc-950">Responder sem revelar remetente</h1>
        <p className="mt-3 text-sm text-zinc-700">
          O dono do perfil responde uma vez. Para mudar uma resposta, a regra do produto e apagar a mensagem ou
          resposta e criar outra.
        </p>
      </aside>
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-950">Caixa de entrada</h2>
          <span className="rounded-md bg-zinc-950 px-3 py-1 text-sm font-medium text-white">{inbox.length} total</span>
        </div>
        <MessageList messages={inbox} ownerView />
      </section>
    </div>
  );
}
