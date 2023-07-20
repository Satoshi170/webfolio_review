import axios from "axios";

import { SignInCredentials, AuthResponse, AuthResponseError } from "@/app/types/auth";

import api from "../api";

export const signIn = async (credentials: SignInCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/auth/sign_in", credentials);
    return response.data;
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
