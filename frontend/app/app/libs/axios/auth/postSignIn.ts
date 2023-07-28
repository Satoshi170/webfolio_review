import axios from "axios";

import { SignInCredentials, SignInResponseError } from "@/app/types/auth";
import { CustomAxiosResponse } from "@/app/types/axios/customAxiosResponse";

import { saveAuthInfoFromHeader } from "../../cookie/saveAuthInfo";
import api from "../api";

export const postSignIn = async (credentials: SignInCredentials): Promise<void> => {
  try {
    const response: CustomAxiosResponse = await api.post("/auth/sign_in", credentials);
    saveAuthInfoFromHeader(response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorResponse = error.response.data as SignInResponseError;
      const errorMessage = errorResponse.errors.join(", ");
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
};
