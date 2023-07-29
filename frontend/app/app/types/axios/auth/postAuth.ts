import { PostAuthSignInCredentials } from "./postAuthSignIn";
import { UserData } from "../../auth";
import { CustomAxiosResponse } from "../customAxiosResponse";

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

export interface PostAuthSuccessResponse extends CustomAxiosResponse {
  data: PostAuthSuccessData;
}

export interface PostAuthErrorResponse extends CustomAxiosResponse {
  data: PostAuthErrorData;
}

export type PostAuthResponse = PostAuthSuccessResponse | PostAuthErrorResponse;
