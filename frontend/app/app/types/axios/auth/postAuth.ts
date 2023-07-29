import { PostSignInCredentials } from "./postAuthSignIn";
import { CustomAxiosResponse } from "../customAxiosResponse";

export interface PostAuthCredentials extends PostSignInCredentials {
  passwordConfirmation: string;
  name: string;
}

export interface PostAuthSuccessData {
  status: "success";
  name: string | null;
  image: string | null;
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
