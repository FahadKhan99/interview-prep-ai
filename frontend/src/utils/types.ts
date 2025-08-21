export type User = {
  _id: string;
  fullName: string;
  email: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type Question = {
  _id: string;
  lessonId: string;
  question: string;
  answer: string;
  note: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Lesson = {
  _id: string;
  user: string;
  experience: string;
  role: string;
  topicsToFocus: string;
  description: string;
  questions: Question[];
  isInProgress: boolean;
  isFavorite: boolean;
  visibility: "private" | "public";
  createdAt: string;
  updatedAt: string;
};
