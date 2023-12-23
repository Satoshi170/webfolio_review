import { UserData } from "@/app/types/auth";

export interface PostCommentParams {
  content: string;
  tagIds?: number[];
}

export interface PostCommentFormParams extends Omit<PostCommentParams, "tagIds"> {
  tagIds: string[];
}

export interface CommentTagData {
  id: number;
  name: string;
}

export interface CommentData {
  id: number;
  content: string;
  updatedAt: Date;
  tags: CommentTagData[];
  user: UserData;
}
