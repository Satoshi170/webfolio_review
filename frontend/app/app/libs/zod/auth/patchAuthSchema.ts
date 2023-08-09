import { z } from "zod";

import { patchAuthValidationErrorMessages } from "@/app/constants/auth/patchAuth/Messages";

export const ImageFileSchema = z.object({
  file: z.object({
    size: z.number().max(2 * 1024 * 1024, patchAuthValidationErrorMessages.imageTooLarge),
    type: z
      .string()
      .refine(
        (type) => ["image/jpeg", "image/png"].includes(type),
        patchAuthValidationErrorMessages.invalidImageType
      )
  })
});

export const PatchAuthSchema = z.object({
  name: z.string().max(25, patchAuthValidationErrorMessages.nameTooLong)
});
