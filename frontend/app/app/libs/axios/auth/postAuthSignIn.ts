import axios from "axios";

import {
  PostAuthSignInCredentials,
  PostAuthSignInErrorResponse,
  PostAuthSignInResponse
} from "@/app/types/axios/auth/postAuthSignIn";

import { saveAuthInfoFromHeader } from "../../cookie/saveAuthInfo";
import api from "../api";

export const postAuthSignIn = async (
  credentials: PostAuthSignInCredentials
): Promise<void> => {
  try {
    const response: PostAuthSignInResponse = await api.post("/auth/sign_in", credentials);
    saveAuthInfoFromHeader(response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorResponse = error.response as PostAuthSignInErrorResponse;
      const errorMessage = errorResponse.data.errors.join(", ");
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
};
