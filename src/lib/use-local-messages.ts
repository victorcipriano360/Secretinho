"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import { currentUser, getProfileByUserId } from "@/lib/mock-data";
import type { AnonymousMessage, LocalNotification, MessageReaction } from "@/lib/types";

const MESSAGE_STORAGE_KEY = "secretinho.messages.v3";
const DELETED_INITIAL_MESSAGES_KEY = "secretinho.deleted-initial-messages.v2";
const READ_NOTIFICATIONS_KEY = "secretinho.read-notifications.v1";
const MESSAGE_EVENT = "secretinho:messages-changed";
const NOTIFICATION_EVENT = "secretinho:notifications-changed";
const QUESTION_ID_LENGTH = 10;
const QUESTION_ID_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const QUESTION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function addDaysToIsoDate(value: string, days: number) {
  return new Date(new Date(value).getTime() + days * 24 * 60 * 60 * 1000).toISOString();
}

const initialMessages: AnonymousMessage[] = [
  {
    id: "msg_teste_victor_01",
    questionId: "TstVictor1",
    receiverUserId: "user_victor",
    requesterUserId: "user_lia",
    messageText: "Mensagem de teste para o VictorTeste01 responder.",
    createdAt: "2026-07-02T00:00:00.000Z",
    expiresAt: "2026-07-09T00:00:00.000Z"
  },
  {
    id: "msg_teste_victor_02",
    questionId: "TstVictor2",
    receiverUserId: "user_victor",
    requesterUserId: "user_caio",
    messageText: "Outra pergunta de teste: você consegue responder esta mensagem e depois apagar só a resposta?",
    createdAt: "2026-07-02T01:00:00.000Z",
    expiresAt: "2026-07-09T01:00:00.000Z"
  }
];

function now() {
  return Date.now();
}

function isExpired(message: AnonymousMessage) {
  return new Date(message.expiresAt ?? addDaysToIsoDate(message.createdAt, 7)).getTime() <= now();
}

function activeMessages(messages: AnonymousMessage[]) {
  return messages.filter((message) => !isExpired(message));
}

function readDeletedInitialMessageIds() {
  if (typeof window === "undefined") {
    return new Set<string>();
  }

  try {
    const deletedIds = JSON.parse(window.localStorage.getItem(DELETED_INITIAL_MESSAGES_KEY) ?? "[]");

    return new Set(Array.isArray(deletedIds) ? (deletedIds as string[]) : []);
  } catch {
    return new Set<string>();
  }
}

function markInitialMessageAsDeleted(messageId: string) {
  const initialMessageIds = new Set(initialMessages.map((message) => message.id));

  if (!initialMessageIds.has(messageId)) {
    return;
  }

  const deletedIds = readDeletedInitialMessageIds();
  deletedIds.add(messageId);
  window.localStorage.setItem(DELETED_INITIAL_MESSAGES_KEY, JSON.stringify([...deletedIds]));
}

function parseMessages(rawMessages: string) {
  try {
    const parsedMessages = JSON.parse(rawMessages);

    if (!Array.isArray(parsedMessages)) {
      return [];
    }

    return parsedMessages
      .filter((message): message is AnonymousMessage => Boolean(message?.id && message?.receiverUserId))
      .map((message) => ({
        ...message,
        questionId: message.questionId ?? generateQuestionId(parsedMessages as AnonymousMessage[]),
        requesterUserId: message.requesterUserId ?? currentUser.id,
        expiresAt: message.expiresAt ?? addDaysToIsoDate(message.createdAt, 7),
        reactions: Array.isArray(message.reactions) ? (message.reactions as MessageReaction[]) : []
      }));
  } catch {
    return [];
  }
}

function messagesWithInitialSeeds(storedMessages: AnonymousMessage[]) {
  const deletedInitialMessageIds = readDeletedInitialMessageIds();
  const storedMessageIds = new Set(storedMessages.map((message) => message.id));
  const visibleInitialMessages = initialMessages.filter(
    (message) => !deletedInitialMessageIds.has(message.id) && !storedMessageIds.has(message.id)
  );

  return activeMessages([...visibleInitialMessages, ...storedMessages]);
}

function readStoredMessages() {
  if (typeof window === "undefined") {
    return initialMessages;
  }

  return parseMessages(window.localStorage.getItem(MESSAGE_STORAGE_KEY) ?? "[]");
}

function readMessages() {
  return messagesWithInitialSeeds(readStoredMessages());
}

function snapshotFromMessages(messages: AnonymousMessage[]) {
  return JSON.stringify(activeMessages(messages));
}

function initialMessagesSnapshot() {
  return snapshotFromMessages(messagesWithInitialSeeds([]));
}

function readSnapshot() {
  if (typeof window === "undefined") {
    return initialMessagesSnapshot();
  }

  return snapshotFromMessages(readMessages());
}

function subscribeToMessages(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(MESSAGE_EVENT, onStoreChange);
  window.addEventListener(NOTIFICATION_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(MESSAGE_EVENT, onStoreChange);
    window.removeEventListener(NOTIFICATION_EVENT, onStoreChange);
  };
}

function writeMessages(messages: AnonymousMessage[]) {
  window.localStorage.setItem(MESSAGE_STORAGE_KEY, snapshotFromMessages(messages));
  window.dispatchEvent(new Event(MESSAGE_EVENT));
  window.dispatchEvent(new Event(NOTIFICATION_EVENT));
}

function randomQuestionId() {
  const cryptoApi = window.crypto;
  let questionId = "";

  for (let index = 0; index < QUESTION_ID_LENGTH; index += 1) {
    const randomValue = cryptoApi?.getRandomValues
      ? cryptoApi.getRandomValues(new Uint32Array(1))[0]
      : Math.floor(Math.random() * QUESTION_ID_CHARS.length);
    questionId += QUESTION_ID_CHARS[randomValue % QUESTION_ID_CHARS.length];
  }

  return questionId;
}

function generateQuestionId(existingMessages: AnonymousMessage[]) {
  const activeQuestionIds = new Set(activeMessages(existingMessages).map((message) => message.questionId));
  let questionId = randomQuestionId();

  while (activeQuestionIds.has(questionId)) {
    questionId = randomQuestionId();
  }

  return questionId;
}

function messagesForUser(messages: AnonymousMessage[], receiverUserId: string) {
  return messages
    .filter((message) => message.receiverUserId === receiverUserId)
    .sort((first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime());
}

function readNotificationIds() {
  if (typeof window === "undefined") {
    return new Set<string>();
  }

  try {
    const notificationIds = JSON.parse(window.localStorage.getItem(READ_NOTIFICATIONS_KEY) ?? "[]");

    return new Set(Array.isArray(notificationIds) ? (notificationIds as string[]) : []);
  } catch {
    return new Set<string>();
  }
}

function notificationSnapshot() {
  if (typeof window === "undefined") {
    return JSON.stringify({
      messages: initialMessagesSnapshot(),
      readIds: []
    });
  }

  return JSON.stringify({
    messages: readSnapshot(),
    readIds: [...readNotificationIds()]
  });
}

function messagesFromNotificationSnapshot(snapshot: string) {
  try {
    const parsedSnapshot = JSON.parse(snapshot);

    return parseMessages(typeof parsedSnapshot?.messages === "string" ? parsedSnapshot.messages : "[]");
  } catch {
    return [];
  }
}

function profileName(userId: string) {
  const profile = getProfileByUserId(userId);

  return profile ? `@${profile.username}` : "um usuário";
}

function notificationsFromMessages(messages: AnonymousMessage[]) {
  const readIds = readNotificationIds();
  const notifications: LocalNotification[] = [];

  activeMessages(messages).forEach((message) => {
    if (message.receiverUserId === currentUser.id) {
      const id = `question_received:${message.id}`;
      notifications.push({
        id,
        type: "question_received",
        title: "Nova pergunta anônima",
        body: "Você recebeu uma pergunta anônima no seu perfil.",
        createdAt: message.createdAt,
        href: "/messages",
        read: readIds.has(id)
      });
    }

    if (message.requesterUserId === currentUser.id && message.answer) {
      const id = `question_answered:${message.id}:${message.answer.id}`;
      notifications.push({
        id,
        type: "question_answered",
        title: "Sua pergunta foi respondida",
        body: `${profileName(message.receiverUserId)} respondeu uma pergunta que você enviou.`,
        createdAt: message.answer.createdAt,
        href: `/@${getProfileByUserId(message.receiverUserId)?.username ?? currentUser.profile.username}`,
        read: readIds.has(id)
      });
    }

    const currentUserReaction = message.reactions?.find((reaction) => reaction.userId === currentUser.id);

    if (currentUserReaction && message.receiverUserId !== currentUser.id) {
      const id = `question_reacted:${message.id}:${currentUserReaction.type}`;
      notifications.push({
        id,
        type: "question_reacted",
        title: "Reação registrada",
        body: `Sua avaliação em uma pergunta de ${profileName(message.receiverUserId)} foi salva.`,
        createdAt: currentUserReaction.createdAt,
        href: `/@${getProfileByUserId(message.receiverUserId)?.username ?? currentUser.profile.username}`,
        read: readIds.has(id)
      });
    }
  });

  return notifications.sort(
    (first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime()
  );
}

export function useLocalMessages(receiverUserId: string) {
  const rawMessages = useSyncExternalStore(subscribeToMessages, readSnapshot, initialMessagesSnapshot);
  const messages = useMemo(
    () => messagesForUser(parseMessages(rawMessages), receiverUserId),
    [rawMessages, receiverUserId]
  );

  const sendMessage = useCallback(
    (messageText: string) => {
      const cleanMessage = messageText.trim();

      if (!cleanMessage) {
        return;
      }

      const allMessages = readMessages();
      const createdAt = new Date().toISOString();
      const newMessage: AnonymousMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        questionId: generateQuestionId(allMessages),
        receiverUserId,
        requesterUserId: currentUser.id,
        messageText: cleanMessage,
        createdAt,
        expiresAt: new Date(new Date(createdAt).getTime() + QUESTION_TTL_MS).toISOString(),
        reactions: []
      };

      writeMessages([newMessage, ...allMessages]);
    },
    [receiverUserId]
  );

  const answerMessage = useCallback((messageId: string, answerText: string) => {
    const cleanAnswer = answerText.trim();

    if (!cleanAnswer) {
      return;
    }

    const allMessages = readMessages().map((message) => {
      if (message.id !== messageId || message.answer) {
        return message;
      }

      return {
        ...message,
        answer: {
          id: `answer_${messageId}`,
          answerText: cleanAnswer,
          createdAt: new Date().toISOString()
        }
      };
    });

    writeMessages(allMessages);
  }, []);

  const deleteMessage = useCallback((messageId: string) => {
    markInitialMessageAsDeleted(messageId);
    writeMessages(readMessages().filter((message) => message.id !== messageId));
  }, []);

  const deleteAnswer = useCallback((messageId: string) => {
    writeMessages(
      readMessages().map((message) => {
        if (message.id !== messageId) {
          return message;
        }

        const { answer: _answer, ...messageWithoutAnswer } = message;

        return messageWithoutAnswer;
      })
    );
  }, []);

  const reactToMessage = useCallback((messageId: string, reactionType: "up" | "down") => {
    writeMessages(
      readMessages().map((message) => {
        if (message.id !== messageId) {
          return message;
        }

        const reactions = message.reactions ?? [];
        const existingReaction = reactions.find((reaction) => reaction.userId === currentUser.id);
        const otherReactions = reactions.filter((reaction) => reaction.userId !== currentUser.id);

        if (existingReaction?.type === reactionType) {
          return {
            ...message,
            reactions: otherReactions
          };
        }

        return {
          ...message,
          reactions: [
            ...otherReactions,
            {
              userId: currentUser.id,
              type: reactionType,
              createdAt: new Date().toISOString()
            }
          ]
        };
      })
    );
  }, []);

  return {
    messages,
    sendMessage,
    answerMessage,
    deleteMessage,
    deleteAnswer,
    reactToMessage
  };
}

export function useLocalNotifications() {
  const snapshot = useSyncExternalStore(subscribeToMessages, notificationSnapshot, notificationSnapshot);
  const notifications = useMemo(
    () => notificationsFromMessages(messagesFromNotificationSnapshot(snapshot)),
    [snapshot]
  );

  const markNotificationAsRead = useCallback((notificationId: string) => {
    const notificationIds = readNotificationIds();
    notificationIds.add(notificationId);
    window.localStorage.setItem(READ_NOTIFICATIONS_KEY, JSON.stringify([...notificationIds]));
    window.dispatchEvent(new Event(NOTIFICATION_EVENT));
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    const notificationIds = new Set(notifications.map((notification) => notification.id));
    window.localStorage.setItem(READ_NOTIFICATIONS_KEY, JSON.stringify([...notificationIds]));
    window.dispatchEvent(new Event(NOTIFICATION_EVENT));
  }, [notifications]);

  return {
    notifications,
    unreadCount: notifications.filter((notification) => !notification.read).length,
    markNotificationAsRead,
    markAllNotificationsAsRead
  };
}
