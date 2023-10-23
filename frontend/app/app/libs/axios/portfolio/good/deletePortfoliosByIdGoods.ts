import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";

import api from "../../api";

export const deletePortfoliosByIdGoods = async (portfolioId: number): Promise<void> => {
  await api.delete(`/portfolios/${portfolioId}/goods`, addAuthInfoToRequest({}));
};
