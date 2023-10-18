import { PortfolioData } from "./portfolioData";

export interface GetPortfoliosData {
  status: "success";
  message: string;
  data: PortfolioData[];
}
