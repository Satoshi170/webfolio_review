import { z } from "zod";

import { signUpValidationErrorMessages } from "@/app/constants/errors/auth/signUp/Messages";

const signUpSchema = z.object({
  name: z
    .string()
    .min(1, signUpValidationErrorMessages.nameRequired)
    .max(25, signUpValidationErrorMessages.nameTooLong),
  email: z
    .string()
    .min(1, signUpValidationErrorMessages.emailRequired)
    .email(signUpValidationErrorMessages.invalidEmail),
  password: z
    .string()
    .min(1, signUpValidationErrorMessages.passwordRequired)
    .min(6, signUpValidationErrorMessages.passwordTooShort),
  passwordConfirmation: z
    .string()
    .min(1, signUpValidationErrorMessages.passwordConfirmationRequired)
});

export const refinedSignUpSchema = signUpSchema.refine(
  (data) => data.password === data.passwordConfirmation,
  {
    message: signUpValidationErrorMessages.passwordConfirmationMismatch,
    path: ["passwordConfirmation"]
  }
);
