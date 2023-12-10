import { z } from "zod";

import { UnauthorizedResponseDataSchema } from "../libs/zod/apiErrorResponses/auth/responseDataSchema";
interface Good {
  portfolioId: number;
}

interface Comment {
  portfolioId: number;
  content: string;
  updatedAt: Date;
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
