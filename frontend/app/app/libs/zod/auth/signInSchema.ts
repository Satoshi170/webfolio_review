import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("無効なメールアドレス形式です"),
  password: z.string().min(1, "パスワードを入力してください")
});
