import type { AnonymousMessage, Profile } from "@/lib/types";

export const profiles: Profile[] = [
  {
    id: "profile_victor",
    userId: "user_victor",
    firstName: "Victor",
    lastName: "Silva",
    username: "victor",
    bio: "Perguntas anonimas, respostas sinceras e sem bagunca.",
    followers: 128,
    following: 42
  },
  {
    id: "profile_lia",
    userId: "user_lia",
    firstName: "Lia",
    lastName: "Marques",
    username: "lia",
    bio: "Cafe, musica e opinioes fortes sobre filmes.",
    followers: 304,
    following: 181
  },
  {
    id: "profile_caio",
    userId: "user_caio",
    firstName: "Caio",
    lastName: "Nunes",
    username: "caion",
    bio: "Abrindo espaco para perguntas que ninguem faz em voz alta.",
    followers: 88,
    following: 95
  },
  {
    id: "profile_maya",
    userId: "user_maya",
    firstName: "Maya",
    lastName: "Costa",
    username: "maya",
    bio: "Respostas curtas, risadas longas.",
    followers: 512,
    following: 220
  }
];

export const currentUser = {
  id: "user_victor",
  email: "victor@email.com",
  profile: profiles[0]
};

export const messages: AnonymousMessage[] = [
  {
    id: "msg_1",
    receiverUserId: "user_victor",
    messageText: "Qual foi a melhor decisao que voce tomou esse ano?",
    createdAt: "2026-06-15T19:28:00.000Z",
    answer: {
      id: "answer_1",
      answerText: "Parar de adiar projetos pequenos. Eles puxam os grandes.",
      createdAt: "2026-06-15T20:10:00.000Z"
    }
  },
  {
    id: "msg_2",
    receiverUserId: "user_victor",
    messageText: "Voce prefere receber elogio anonimo ou pergunta anonima?",
    createdAt: "2026-06-16T09:12:00.000Z"
  },
  {
    id: "msg_3",
    receiverUserId: "user_lia",
    messageText: "Indica uma musica para hoje?",
    createdAt: "2026-06-14T22:05:00.000Z",
    answer: {
      id: "answer_3",
      answerText: "Comeca com algo calmo e deixa o dia decidir o resto.",
      createdAt: "2026-06-15T08:44:00.000Z"
    }
  }
];

export function getProfileByUsername(username: string) {
  const cleanUsername = username.replace(/^@/, "").toLowerCase();

  return profiles.find((profile) => profile.username === cleanUsername);
}

export function getMessagesForUser(userId: string) {
  return messages.filter((message) => message.receiverUserId === userId);
}

export function searchProfiles(query: string) {
  const normalized = query.trim().replace(/^@/, "").toLowerCase();

  if (!normalized) {
    return profiles;
  }

  return profiles.filter((profile) => {
    const fullName = `${profile.firstName} ${profile.lastName}`.toLowerCase();

    return fullName.includes(normalized) || profile.username.includes(normalized);
  });
}
