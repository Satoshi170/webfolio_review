import axios from "axios";

import { GetAuthSessionsData } from "@/app/types/axios/auth/getAuthSessions";

import { addAuthInfoToRequest } from "../../cookie/loadAuthInfo";
import api from "../api";

export const getAuthSessions = async (): Promise<GetAuthSessionsData> => {
  try {
    const response = await api.get<GetAuthSessionsData>(
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
