import type { UnauthorizedResponseDataSchema } from "../libs/zod/apiErrorResponses/auth/responseDataSchema";
import type { z } from "zod";

export interface UserData {
  id: number;
  name: string;
  image: string;
}

export interface MyData extends UserData {
  role: "user" | "guest";
}

export type UnauthorizedResponseData = z.infer<typeof UnauthorizedResponseDataSchema>;
