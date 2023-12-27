import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";
import { PostCommentParams } from "@/app/types/axios/portfolio/comment/comment";

import api from "../../api";

export const patchPortfoliosByIdComments = async (
  portfolioId: number,
  commentId: number,
  params: PostCommentParams
): Promise<void> => {
  await api.patch(
    `/portfolios/${portfolioId}/comments/${commentId}`,
    { comment: params },
    addAuthInfoToRequest({})
  );
};
