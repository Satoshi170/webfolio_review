import axios from "axios";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";

import addAuthInfoToRequest from "../../cookie/loadAuthInfo";
import { UnauthorizedResponseDataSchema } from "../../zod/apiErrorResponses/auth/responseDataSchema";
import { PatchPortfoliosByIdFailedDataSchema } from "../../zod/apiErrorResponses/portfolio/patchPortfoliosByIdDataSchema";
import api from "../api";

import type { UnauthorizedResponseData } from "@/app/types/auth";
import type {
  PatchPortfoliosByIdErrorData,
  PatchPortfoliosByIdFailedData,
  PatchPortfoliosByIdParams,
  PatchPortfoliosByIdSuccessData
} from "@/app/types/axios/portfolio/patchPortfoliosById";

const generateErrorMessage = (responseData: PatchPortfoliosByIdErrorData) => {
  if (UnauthorizedResponseDataSchema.safeParse(responseData).success) {
    return (responseData as UnauthorizedResponseData).errors.join(", ");
  } else if (PatchPortfoliosByIdFailedDataSchema.safeParse(responseData).success) {
    return (responseData as PatchPortfoliosByIdFailedData).errors.join(", ");
  }
  return UNEXPECTED_ERROR_MESSAGE;
};

export const patchPortfoliosById = async (
  id: number,
  params: PatchPortfoliosByIdParams
): Promise<void> => {
  try {
    await api.patch<PatchPortfoliosByIdSuccessData>(
      `/portfolios/${id}`,
      params,
      addAuthInfoToRequest({})
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const responseData = error.response.data as PatchPortfoliosByIdErrorData;
      const errorMessage = generateErrorMessage(responseData);
      throw new Error(errorMessage);
    }
    throw error;
  }
};
