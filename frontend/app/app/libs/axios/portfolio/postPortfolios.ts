import axios from "axios";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";

import addAuthInfoToRequest from "../../cookie/loadAuthInfo";
import { UnauthorizedResponseDataSchema } from "../../zod/apiErrorResponses/auth/responseDataSchema";
import { PostPortfoliosFailedDataSchema } from "../../zod/apiErrorResponses/portfolio/postPortfoliosDataSchema";
import api from "../api";

import type {
  PostPortfoliosErrorData,
  PostPortfoliosParams
} from "@/app/types/axios/portfolio/postPortfolios";

export const postPortfolios = async (params: PostPortfoliosParams): Promise<void> => {
  try {
    await api.post("/portfolios", params, addAuthInfoToRequest({}));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const responseData = error.response.data as PostPortfoliosErrorData;

      if (UnauthorizedResponseDataSchema.safeParse(responseData).success) {
        const errorMessage = responseData.errors.join(", ");
        throw new Error(errorMessage);
      } else if (PostPortfoliosFailedDataSchema.safeParse(responseData).success) {
        const errorMessage = responseData.errors.join(", ");
        throw new Error(errorMessage);
      }
      throw new Error(UNEXPECTED_ERROR_MESSAGE);
    } else {
      throw error;
    }
  }
};
