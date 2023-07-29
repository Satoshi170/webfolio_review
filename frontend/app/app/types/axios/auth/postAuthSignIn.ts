import { UserData } from "../../auth";
import { CustomAxiosResponse } from "../customAxiosResponse";

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

export interface PostAuthSignInSuccessResponse extends CustomAxiosResponse {
  data: PostAuthSignInSuccessData;
}

export interface PostAuthSignInErrorResponse extends CustomAxiosResponse {
  data: PostAuthSignInErrorData;
}

export type PostAuthSignInResponse =
  | PostAuthSignInSuccessResponse
  | PostAuthSignInErrorResponse;
