export interface PostAuthSignInCredentials {
  email: string;
  password: string;
}

export interface PostAuthSignInSuccessData {
  success: true;
  message: string;
}

export interface PostAuthSignInErrorData {
  success: false;
  errors: string[];
}

export type PostAuthSignInData = PostAuthSignInSuccessData | PostAuthSignInErrorData;
