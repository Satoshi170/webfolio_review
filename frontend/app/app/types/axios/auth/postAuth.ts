import type { PostAuthSignInCredentials } from "./postAuthSignIn";
import type { UserData } from "../../auth";
import type { PostAuthFailedDataSchema } from "@/app/libs/zod/apiErrorResponses/auth/postAuthDataSchema";
import type { z } from "zod";

export interface PostAuthCredentials extends PostAuthSignInCredentials {
  passwordConfirmation: string;
  name: string;
}

export interface PostAuthSuccessData {
  status: "success";
  data: UserData;
}

export type PostAuthFailedData = z.infer<typeof PostAuthFailedDataSchema>;
export type PostAuthErrorData = PostAuthFailedData;
export type PostAuthData = PostAuthSuccessData | PostAuthErrorData;
