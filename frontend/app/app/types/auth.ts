import { z } from "zod";

import { UnauthorizedResponseDataSchema } from "../libs/zod/apiErrorResponses/auth/responseDataSchema";
interface Good {
  portfolioId: number;
}

export interface UserData {
  id: number;
  name: string;
  role: "user" | "guest";
  image: string;
  goods: Good[];
}

export type UnauthorizedResponseData = z.infer<typeof UnauthorizedResponseDataSchema>;
