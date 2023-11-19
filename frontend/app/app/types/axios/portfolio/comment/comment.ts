import { UserData } from "@/app/types/auth";

export interface CommentParams {
  content: string;
}

export interface CommentData extends CommentParams {
  id: number;
  updatedAt: Date;
  user: UserData;
}
