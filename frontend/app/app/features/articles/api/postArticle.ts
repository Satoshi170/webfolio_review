import axios from "axios";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import api from "@/app/libs/axios/api";
import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";
import { UnauthorizedResponseDataSchema } from "@/app/libs/zod/apiErrorResponses/auth/responseDataSchema";
import { PostPortfoliosFailedDataSchema } from "@/app/libs/zod/apiErrorResponses/portfolio/postPortfoliosDataSchema";

import type { PostArticleErrorData, PostArticleParams } from "../types/api/postArticle";
import type { ArticleData } from "../types/articleData";

export const postArticle = async (params: PostArticleParams): Promise<ArticleData> => {
  try {
    const response = await api.post<ArticleData>(
      "/articles",
      params,
      addAuthInfoToRequest({})
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const responseData = error.response.data as PostArticleErrorData;

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
