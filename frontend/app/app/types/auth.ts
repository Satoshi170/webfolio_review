import { z } from "zod";

import { UnauthorizedResponseDataSchema } from "../libs/zod/apiErrorResponses/auth/responseDataSchema";

export interface UserData {
  id: number;
  name: string;
  image: string;
}

export type UnauthorizedResponseData = z.infer<typeof UnauthorizedResponseDataSchema>;
