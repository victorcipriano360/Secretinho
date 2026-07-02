import type { Profile } from "@/lib/types";

export const programmerContact = {
  name: "Victor Cipriano",
  role: "Programador geral",
  profileLabel: "@VictorTeste01",
  profilePath: "/@VictorTeste01"
} as const;

export const communicationUserProfile: Profile = {
  id: "profile_erika",
  userId: "user_erika",
  firstName: "Erika",
  lastName: "Assistente virtual",
  username: "Erika",
  bio: `Assistente virtual do Secretinho. Contato do ${programmerContact.role}: ${programmerContact.name} (${programmerContact.profileLabel}).`,
  followers: 0,
  following: 0
};

export const profiles: Profile[] = [
  {
    id: "profile_victor",
    userId: "user_victor",
    firstName: "VictorTeste01",
    lastName: "Silva",
    username: "VictorTeste01",
    bio: "Perguntas anônimas, respostas sinceras e sem bagunça.",
    followers: 0,
    following: 0
  },
  {
    id: "profile_lia",
    userId: "user_lia",
    firstName: "LiaTeste02",
    lastName: "Marques",
    username: "LiaTeste02",
    bio: "Cafe, musica e opinioes fortes sobre filmes.",
    followers: 0,
    following: 0
  },
  {
    id: "profile_caio",
    userId: "user_caio",
    firstName: "CaioTeste03",
    lastName: "Nunes",
    username: "CaionTeste03",
    bio: "Abrindo espaço para perguntas que ninguém faz em voz alta.",
    followers: 0,
    following: 0
  },
  {
    id: "profile_maya",
    userId: "user_maya",
    firstName: "MayaTeste04",
    lastName: "Costa",
    username: "MayaTeste04",
    bio: "Respostas curtas, risadas longas.",
    followers: 0,
    following: 0
  },
  communicationUserProfile
];

export const reservedUsernames = profiles.map((profile) => profile.username.toLowerCase());

export function normalizeUsername(username: string) {
  return username.trim().replace(/^@+/, "");
}

export function getUsernameValidationError(username: string, allowedProfileId?: string) {
  const cleanUsername = normalizeUsername(username);

  if (!cleanUsername) {
    return "Escolha um @ para continuar.";
  }

  if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
    return "Use apenas letras, números ou underline, sem espaços.";
  }

  const usernameOwner = profiles.find((profile) => profile.username.toLowerCase() === cleanUsername.toLowerCase());

  if (usernameOwner && usernameOwner.id !== allowedProfileId) {
    return "Este @ já está em uso.";
  }

  return null;
}

export const currentUser = {
  id: "user_victor",
  email: "victor@email.com",
  profile: profiles[0]
};

export function getProfileByUsername(username: string) {
  const cleanUsername = username.replace(/^@/, "").toLowerCase();

  return profiles.find((profile) => profile.username.toLowerCase() === cleanUsername);
}

export function getProfileByUserId(userId: string) {
  return profiles.find((profile) => profile.userId === userId);
}

export function searchProfiles(query: string) {
  const normalized = query.trim().replace(/^@/, "").toLowerCase();

  if (!normalized) {
    return profiles;
  }

  return profiles.filter((profile) => {
    const fullName = `${profile.firstName} ${profile.lastName}`.toLowerCase();

    return fullName.includes(normalized) || profile.username.toLowerCase().includes(normalized);
  });
}
