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

export interface PostAuthErrorData {
  status: "error";
  errors: {
    fullMessages: string[];
  };
}

export type PostAuthData = PostAuthSuccessData | PostAuthErrorData;
