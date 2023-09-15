import axios from "axios";

import {
  PostAuthSignInCredentials,
  PostAuthSignInErrorData
} from "@/app/types/axios/auth/postAuthSignIn";
import { CustomAxiosResponse } from "@/app/types/axios/customAxiosResponse";

import { saveAuthInfoFromHeader } from "../../cookie/saveAuthInfo";
import api from "../api";

export const postAuthSignIn = async (
  credentials: PostAuthSignInCredentials
): Promise<void> => {
  try {
    const response: CustomAxiosResponse = await api.post("/auth/sign_in", credentials);
    saveAuthInfoFromHeader(response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorResponseData = error.response.data as PostAuthSignInErrorData;
      const errorMessage = errorResponseData.errors.join(", ");
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
};
