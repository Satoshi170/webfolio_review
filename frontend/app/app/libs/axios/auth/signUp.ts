import axios from "axios";

import { AuthResponseError, SignUpCredentials } from "@/app/types/auth";

import api from "../api";

export const signUp = async (credentials: SignUpCredentials): Promise<void> => {
  try {
    await api.post("/auth", credentials);
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
