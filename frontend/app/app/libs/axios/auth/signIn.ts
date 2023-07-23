import axios from "axios";

import { SignInCredentials, AuthResponseError } from "@/app/types/auth";
import { CustomAxiosResponse } from "@/app/types/axios/customAxiosResponse";

import { saveAuthInfoFromHeader } from "../../cookie/saveAuthInfo";
import api from "../api";

export const signIn = async (credentials: SignInCredentials): Promise<void> => {
  try {
    const response: CustomAxiosResponse = await api.post("/auth/sign_in", credentials);
    saveAuthInfoFromHeader(response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorResponse = error.response.data as AuthResponseError;
      const errorMessage = errorResponse.errors.fullMessages.join(", ");
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
};
