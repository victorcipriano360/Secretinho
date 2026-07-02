"use client";

import { MessageList } from "@/components/message-list";
import { useLocalMessages } from "@/lib/use-local-messages";

type StoredMessageListProps = {
  receiverUserId: string;
  ownerView?: boolean;
};

export function StoredMessageList({ receiverUserId, ownerView = false }: StoredMessageListProps) {
  const { messages, answerMessage, deleteMessage, deleteAnswer, reactToMessage } = useLocalMessages(receiverUserId);

  return (
    <MessageList
      messages={messages}
      ownerView={ownerView}
      onAnswer={answerMessage}
      onDelete={deleteMessage}
      onDeleteAnswer={deleteAnswer}
      onReact={reactToMessage}
    />
  );
}
