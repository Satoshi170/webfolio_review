import type { PortfolioData } from "./portfolioData";

export interface GetPortfoliosByIdSuccessData {
  status: "success";
  message: string;
  data: PortfolioData;
}

export type GetPortfoliosByIdData = GetPortfoliosByIdSuccessData;
