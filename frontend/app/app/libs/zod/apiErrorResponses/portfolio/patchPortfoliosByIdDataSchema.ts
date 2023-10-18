import { z } from "zod";

export const PatchPortfoliosByIdFailedDataSchema = z.object({
  status: z.literal("error"),
  message: z.string(),
  errors: z.array(z.string())
});
