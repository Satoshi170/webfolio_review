import type { UnauthorizedResponseDataSchema } from "../libs/zod/apiErrorResponses/auth/responseDataSchema";
import type { z } from "zod";

export interface MyData {
  id: number;
  name: string;
  role: "user" | "guest";
  image: string;
}

export interface UserData {
  id: number;
  name: string;
  image: string;
}

export type UnauthorizedResponseData = z.infer<typeof UnauthorizedResponseDataSchema>;
