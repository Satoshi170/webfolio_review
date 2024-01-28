import { z } from "zod";

import { CommentTagData } from "./axios/portfolio/comment/comment";
import { UnauthorizedResponseDataSchema } from "../libs/zod/apiErrorResponses/auth/responseDataSchema";
interface Good {
  portfolioId: number;
}

interface Portfolio {
  id: number;
  title: string;
}
interface Comment {
  content: string;
  tags: CommentTagData[];
  updatedAt: Date;
  portfolio: Portfolio;
}

export interface UserData {
  id: number;
  name: string;
  role: "user" | "guest";
  image: string;
  goods: Good[];
  comments: Comment[];
}

export interface UserDataWithoutGoodsAndComments {
  id: number;
  name: string;
  image: string;
}

export type UnauthorizedResponseData = z.infer<typeof UnauthorizedResponseDataSchema>;
