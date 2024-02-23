import axios from "axios";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";

import addAuthInfoToRequest from "../../cookie/loadAuthInfo";
import { UnauthorizedResponseDataSchema } from "../../zod/apiErrorResponses/auth/responseDataSchema";
import api from "../api";

import type {
  DeletePortfoliosByIdErrorData,
  DeletePortfoliosByIdSuccessData
} from "@/app/types/axios/portfolio/deletePortfoliosById";

export const deletePortfoliosById = async (id: number): Promise<void> => {
  try {
    await api.delete<DeletePortfoliosByIdSuccessData>(
      `/articles/${id}`,
      addAuthInfoToRequest({})
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const responseData = error.response.data as DeletePortfoliosByIdErrorData;

      if (UnauthorizedResponseDataSchema.safeParse(responseData).success) {
        const errorMessage = responseData.errors.join(", ");
        throw new Error(errorMessage);
      } else {
        throw new Error(UNEXPECTED_ERROR_MESSAGE);
      }
    } else {
      throw error;
    }
  }
};
