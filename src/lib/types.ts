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
  questionId: string;
  receiverUserId: string;
  requesterUserId: string;
  messageText: string;
  createdAt: string;
  expiresAt: string;
  reactions?: MessageReaction[];
  answer?: {
    id: string;
    answerText: string;
    createdAt: string;
  };
};

export type FollowRelationship = {
  followerUserId: string;
  followingUserId: string;
  createdAt: string;
};

export type MessageReaction = {
  userId: string;
  type: "up" | "down";
  createdAt: string;
};

export type LocalNotification = {
  id: string;
  type: "question_received" | "question_answered" | "question_reacted";
  title: string;
  body: string;
  createdAt: string;
  href: string;
  read: boolean;
};
