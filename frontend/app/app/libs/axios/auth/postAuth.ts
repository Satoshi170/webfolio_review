import axios from "axios";

import {
  PostAuthCredentials,
  PostAuthErrorResponse,
  PostAuthResponse
} from "@/app/types/axios/auth/postAuth";

import { saveAuthInfoFromHeader } from "../../cookie/saveAuthInfo";
import api from "../api";

export const postAuth = async (credentials: PostAuthCredentials): Promise<void> => {
  try {
    const response: PostAuthResponse = await api.post("/auth", credentials);
    saveAuthInfoFromHeader(response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorResponse = error.response as PostAuthErrorResponse;
      const errorMessage = errorResponse.data.errors.fullMessages.join(", ");
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
};
