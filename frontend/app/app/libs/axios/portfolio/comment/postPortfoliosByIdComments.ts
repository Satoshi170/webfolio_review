import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";
import { CommentParams } from "@/app/types/axios/portfolio/comment/comment";

import api from "../../api";

export const postPortfoliosByIdComments = async (
  portfolioId: number,
  params: CommentParams
): Promise<void> => {
  await api.post(`/portfolios/${portfolioId}/comments`, params, addAuthInfoToRequest({}));
};
