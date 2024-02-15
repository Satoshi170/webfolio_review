import type { candidateTagData } from "@/app/constants/datas/portfolios/comments/tags";
import type { UserData } from "@/app/types/auth";

export interface PostCommentParams {
  content: string;
  tagIds?: number[];
}

export interface PostCommentFormParams extends Omit<PostCommentParams, "tagIds"> {
  tagIds: string[];
}

export type CommentTagData = keyof typeof candidateTagData;

export interface CommentData {
  id: number;
  content: string;
  updatedAt: Date;
  tags: CommentTagData[] | [];
  user: UserData;
}
