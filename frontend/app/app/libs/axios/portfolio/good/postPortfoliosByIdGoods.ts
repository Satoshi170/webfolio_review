import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";

import api from "../../api";

export const postPortfoliosByIdGoods = async (portfolioId: number): Promise<void> => {
  await api.post(`/portfolios/${portfolioId}/goods`, {}, addAuthInfoToRequest({}));
};
