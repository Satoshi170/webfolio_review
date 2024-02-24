import type { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

export interface GetArticlesSuccessData {
  status: "success";
  message: string;
  data: PortfolioData[] | [];
}
