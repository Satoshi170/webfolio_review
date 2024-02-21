import { z } from "zod";

import { patchAuthValidationErrorMessages } from "./messages";

export const PatchAuthImageSchema = z.object({
  image: z.object({
    size: z.number().max(2 * 1024 * 1024, patchAuthValidationErrorMessages.imageTooLarge),
    type: z
      .string()
      .refine(
        (type) => ["image/jpeg", "image/png"].includes(type),
        patchAuthValidationErrorMessages.invalidImageType
      )
  })
});

export const PatchAuthNonImageSchema = z.object({
  name: z.string().max(25, patchAuthValidationErrorMessages.nameTooLong)
});
