import { z } from "zod";

export const PostAuthFailedDataSchema = z.object({
  status: z.literal("error"),
  errors: z.object({
    fullMessages: z.array(z.string())
  })
});
