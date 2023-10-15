import { z } from "zod";

export const PostAuthSignInFailedDataSchema = z.object({
  success: z.literal(false),
  errors: z.array(z.string())
});
