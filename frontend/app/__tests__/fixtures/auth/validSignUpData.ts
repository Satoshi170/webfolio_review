import type { PostAuthCredentials } from "@/app/types/axios/auth/postAuth";

export const validSignUpData: PostAuthCredentials = {
  name: "testuser",
  email: "test@example.com",
  password: "password",
  passwordConfirmation: "password"
};
