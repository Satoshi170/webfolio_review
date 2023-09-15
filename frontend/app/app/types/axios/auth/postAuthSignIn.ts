import { UserData } from "../../auth";

export interface PostAuthSignInCredentials {
  email: string;
  password: string;
}

export interface PostAuthSignInSuccessData {
  data: UserData;
}

export interface PostAuthSignInErrorData {
  success: false;
  errors: string[];
}

export type PostAuthSignInData = PostAuthSignInSuccessData | PostAuthSignInErrorData;
