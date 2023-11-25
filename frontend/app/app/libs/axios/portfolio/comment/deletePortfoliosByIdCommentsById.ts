import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";

import api from "../../api";

export const deletePortfoliosByIdComments = async (
  portfolioId: number,
  commentId: number
): Promise<void> => {
  await api.delete(
    `/portfolios/${portfolioId}/comments/${commentId}`,
    addAuthInfoToRequest({})
  );
};
