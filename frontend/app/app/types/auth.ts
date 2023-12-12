import { z } from "zod";

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

export type UnauthorizedResponseData = z.infer<typeof UnauthorizedResponseDataSchema>;
