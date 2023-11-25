import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";
import { CommentParams } from "@/app/types/axios/portfolio/comment/comment";

import api from "../../api";

export const patchPortfoliosByIdComments = async (
  portfolioId: number,
  commentId: number,
  params: CommentParams
): Promise<void> => {
  await api.patch(
    `/portfolios/${portfolioId}/comments/${commentId}`,
    params,
    addAuthInfoToRequest({})
  );
};
