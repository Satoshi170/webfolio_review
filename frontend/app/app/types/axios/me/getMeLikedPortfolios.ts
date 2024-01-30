import { PortfolioData } from "../portfolio/portfolioData";

export interface GetMeLikedPortfolios {
  status: "success";
  message: string;
  data: PortfolioData[] | [];
}
