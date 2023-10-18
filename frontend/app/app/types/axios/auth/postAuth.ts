import { z } from "zod";

import { PostAuthFailedDataSchema } from "@/app/libs/zod/apiErrorResponses/auth/postAuthDataSchema";

import { PostAuthSignInCredentials } from "./postAuthSignIn";
import { UserData } from "../../auth";

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
