import axios, { AxiosRequestConfig } from "axios";

import {
  PatchAuthErrorData,
  PatchAuthParams,
  PatchAuthParamsBase
} from "@/app/types/axios/auth/patchAuth";

import { addAuthInfoToRequest } from "../../cookie/loadAuthInfo";
import api from "../api";

export const patchAuth = async (
  params: PatchAuthParams,
  config?: AxiosRequestConfig
): Promise<void> => {
  let data: FormData | PatchAuthParamsBase;

  if ("image" in params) {
    data = new FormData();
    Object.entries(params).forEach(([key, value]) => {
      if (data instanceof FormData) {
        data.append(key, value as string | File);
      }
    });
    config = {
      ...config,
      headers: { ...config?.headers, "Content-Type": "multipart/form-data" }
    };
  } else {
    data = params;
  }
  config = addAuthInfoToRequest(config || {});
  try {
    await api.patch("/auth", data, config);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorResponseData = error.response.data as PatchAuthErrorData;
      const errorMessage = errorResponseData.errors.join(", ");
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
};
