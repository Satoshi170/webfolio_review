import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";
import { PostCommentParams } from "@/app/types/axios/portfolio/comment/comment";

import api from "../../api";

export const postPortfoliosByIdComments = async (
  portfolioId: number,
  params: PostCommentParams
): Promise<void> => {
  await api.post(
    `/portfolios/${portfolioId}/comments`,
    { comment: params },
    addAuthInfoToRequest({})
  );
};
