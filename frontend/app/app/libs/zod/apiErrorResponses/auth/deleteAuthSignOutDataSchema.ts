import { z } from "zod";

export const DeleteAuthSignOutFailedDataSchema = z.object({
  status: z.literal("error"),
  errors: z.array(z.string())
});
