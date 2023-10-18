import { z } from "zod";

export const UnauthorizedResponseDataSchema = z.object({
  errors: z.array(z.string())
});
