import { z } from "zod";

const signUpSchema = z.object({
  name: z
    .string()
    .min(1, "ユーザー名は必須です")
    .max(25, "ユーザー名は25文字以内である必要があります"),
  email: z
    .string()
    .min(1, "メールアドレスは必須です")
    .email("無効なメールアドレス形式です"),
  password: z
    .string()
    .min(1, "パスワードは必須です")
    .min(6, "パスワードは6文字以上である必要があります"),
  passwordConfirmation: z.string().min(1, "パスワードをもう一度入力してください")
});

export const refinedSignUpSchema = signUpSchema.refine(
  (data) => data.password === data.passwordConfirmation,
  {
    message: "パスワードと確認用パスワードが一致しません",
    path: ["passwordConfirmation"]
  }
);
