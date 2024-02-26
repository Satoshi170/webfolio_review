import type { candidateTagData } from "../datas/tags";
import type { UserData } from "@/app/types/auth";

export type CommentTagData = keyof typeof candidateTagData;

export interface CommentData {
  id: number;
  content: string;
  updatedAt: Date;
  tags: CommentTagData[] | [];
  user: UserData;
}
