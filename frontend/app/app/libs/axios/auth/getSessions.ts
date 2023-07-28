import axios from "axios";

import { GetAuthSessionsResponse } from "@/app/types/auth";

import { addAuthInfoToRequest } from "../../cookie/loadAuthInfo";
import api from "../api";

export const getSessions = async (): Promise<GetAuthSessionsResponse> => {
  try {
    const response = await api.get<GetAuthSessionsResponse>(
      "/auth/sessions",
      addAuthInfoToRequest({})
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};
