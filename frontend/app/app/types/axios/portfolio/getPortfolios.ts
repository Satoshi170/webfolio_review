import type { PortfolioData } from "./portfolioData";

export interface GetPortfoliosResponse {
  status: "success";
  message: string;
  data: PortfolioData[];
}
