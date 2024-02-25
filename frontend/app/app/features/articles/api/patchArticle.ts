import axios from "axios";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import api from "@/app/libs/axios/api";
import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";
import { UnauthorizedResponseDataSchema } from "@/app/libs/zod/apiErrorResponses/auth/responseDataSchema";
import { PatchPortfoliosByIdFailedDataSchema } from "@/app/libs/zod/apiErrorResponses/portfolio/patchPortfoliosByIdDataSchema";

import type {
  PatchArticleErrorData,
  PatchArticleFailedData,
  PatchArticleParams,
  PatchArticleSuccessData
} from "../types/api/patchArticle";
import type { UnauthorizedResponseData } from "@/app/types/auth";

const generateErrorMessage = (responseData: PatchArticleErrorData) => {
  if (UnauthorizedResponseDataSchema.safeParse(responseData).success) {
    return (responseData as UnauthorizedResponseData).errors.join(", ");
  } else if (PatchPortfoliosByIdFailedDataSchema.safeParse(responseData).success) {
    return (responseData as PatchArticleFailedData).errors.join(", ");
  }
  return UNEXPECTED_ERROR_MESSAGE;
};

export const patchArticle = async (
  id: number,
  params: PatchArticleParams
): Promise<void> => {
  try {
    await api.patch<PatchArticleSuccessData>(
      `/articles/${id}`,
      params,
      addAuthInfoToRequest({})
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const responseData = error.response.data as PatchArticleErrorData;
      const errorMessage = generateErrorMessage(responseData);
      throw new Error(errorMessage);
    }
    throw error;
  }
};
