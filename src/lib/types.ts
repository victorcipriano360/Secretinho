export type Profile = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  photoUrl?: string;
  bio?: string;
  followers: number;
  following: number;
};

export type AnonymousMessage = {
  id: string;
  receiverUserId: string;
  messageText: string;
  createdAt: string;
  answer?: {
    id: string;
    answerText: string;
    createdAt: string;
  };
};

export type ApiResult<T = unknown> = {
  ok: boolean;
  data?: T;
  error?: string;
  notPersisted?: boolean;
};
