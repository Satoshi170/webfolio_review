import axios from "axios";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";


import addAuthInfoToRequest from "../../cookie/loadAuthInfo";
import { PatchAuthFailedDataSchema } from "../../zod/apiErrorResponses/auth/patchAuthDataSchema";
import { UnauthorizedResponseDataSchema } from "../../zod/apiErrorResponses/auth/responseDataSchema";
import api from "../api";

import type { UnauthorizedResponseData } from "@/app/types/auth";
import type {
  PatchAuthErrorData,
  PatchAuthFailedData,
  PatchAuthParams,
  PatchAuthParamsBase
} from "@/app/types/axios/auth/patchAuth";
import type { AxiosRequestConfig } from "axios";

const generateErrorMessage = (responseData: PatchAuthErrorData) => {
  if (UnauthorizedResponseDataSchema.safeParse(responseData).success) {
    return (responseData as UnauthorizedResponseData).errors.join(", ");
  } else if (PatchAuthFailedDataSchema.safeParse(responseData).success) {
    return (responseData as PatchAuthFailedData).errors.fullMessages.join(", ");
  }
  return UNEXPECTED_ERROR_MESSAGE;
};

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
      const responseData = error.response.data as PatchAuthErrorData;
      const errorMessage = generateErrorMessage(responseData);
      throw new Error(errorMessage);
    }
    throw error;
  }
};
