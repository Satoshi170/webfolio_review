import axios from "axios";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import api from "@/app/libs/axios/api";
import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";
import { UnauthorizedResponseDataSchema } from "@/app/libs/zod/apiErrorResponses/auth/responseDataSchema";

import type {
  DeleteArticleErrorData,
  DeleteArticleSuccessData
} from "../types/api/deleteArticle";

export const deleteArticle = async (id: number): Promise<void> => {
  try {
    await api.delete<DeleteArticleSuccessData>(
      `/articles/${id}`,
      addAuthInfoToRequest({})
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const responseData = error.response.data as DeleteArticleErrorData;

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
