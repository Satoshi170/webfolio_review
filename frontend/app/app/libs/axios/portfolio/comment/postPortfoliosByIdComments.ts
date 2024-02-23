import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";

import api from "../../api";

import type { PostCommentParams } from "@/app/types/axios/portfolio/comment/comment";

export const postPortfoliosByIdComments = async (
  portfolioId: number,
  params: PostCommentParams
): Promise<void> => {
  await api.post(
    `/articles/${portfolioId}/comments`,
    { comment: params },
    addAuthInfoToRequest({})
  );
};
