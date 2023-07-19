import axios from "axios";

import { AuthResponse, AuthResponseError, SignUpCredentials } from "@/app/types/auth";

import api from "../api";

export const signUp = async (credentials: SignUpCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/auth", credentials);
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
