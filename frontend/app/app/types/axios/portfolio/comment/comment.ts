import { UserData } from "@/app/types/auth";

export interface PostCommentParams {
  content: string;
  tagIds?: number[];
}

interface tagData {
  id: number;
  name: string;
}

export interface CommentData {
  id: number;
  content: string;
  updatedAt: Date;
  tags: tagData[];
  user: UserData;
}
