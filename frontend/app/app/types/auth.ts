import type { CommentTagData } from "../features/articles/_comments/types";
import type { UnauthorizedResponseDataSchema } from "../libs/zod/apiErrorResponses/auth/responseDataSchema";
import type { z } from "zod";

interface Article {
  id: number;
  title: string;
}
interface Comment {
  content: string;
  tags: CommentTagData[];
  updatedAt: Date;
  article: Article;
}

export interface UserData {
  id: number;
  name: string;
  role: "user" | "guest";
  image: string;
  comments: Comment[];
}

export interface UserDataWithoutGoodsAndComments {
  id: number;
  name: string;
  image: string;
}

export type UnauthorizedResponseData = z.infer<typeof UnauthorizedResponseDataSchema>;
