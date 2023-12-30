import { tagDatas } from "@/app/constants/datas/tags";
import { UserData } from "@/app/types/auth";

export interface PostCommentParams {
  content: string;
  tagIds?: number[];
}

export interface PostCommentFormParams extends Omit<PostCommentParams, "tagIds"> {
  tagIds: string[];
}

export type CommentTagData = (typeof tagDatas)[number];

export interface CommentData {
  id: number;
  content: string;
  updatedAt: Date;
  tags: CommentTagData[];
  user: UserData;
}
