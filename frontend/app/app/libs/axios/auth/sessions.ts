import axios from "axios";

import { AuthSessionsResponse } from "@/app/types/auth";

import { addAuthInfoToRequest } from "../../cookie/loadAuthInfo";
import api from "../api";

export const sessions = async (): Promise<AuthSessionsResponse> => {
  try {
    const response = await api.get<AuthSessionsResponse>(
      "/auth/sessions",
      addAuthInfoToRequest({})
    );
    return response.data;
  } catch (error) {
    console.log("Error in sessions", error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};
