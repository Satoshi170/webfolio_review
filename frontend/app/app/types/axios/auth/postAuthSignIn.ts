import { z } from "zod";

import { PostAuthSignInFailedDataSchema } from "@/app/libs/zod/apiErrorResponses/auth/postAuthSignInDataSchema";

export interface PostAuthSignInCredentials {
  email: string;
  password: string;
}

export interface PostAuthSignInSuccessData {
  success: true;
  message: string;
}

export type PostAuthSignInFailedData = z.infer<typeof PostAuthSignInFailedDataSchema>;
export type PostAuthSignInErrorData = PostAuthSignInFailedData;
export type PostAuthSignInData = PostAuthSignInSuccessData | PostAuthSignInErrorData;
