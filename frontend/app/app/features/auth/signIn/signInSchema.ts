import { z } from "zod";

import { signInValidationErrorMessages } from "./messages";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, signInValidationErrorMessages.emailRequired)
    .email(signInValidationErrorMessages.invalidEmail),
  password: z.string().min(1, signInValidationErrorMessages.passwordRequired)
});
