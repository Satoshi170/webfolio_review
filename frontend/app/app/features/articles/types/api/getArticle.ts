import type { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

export interface GetArticleSuccessData {
  status: "success";
  message: string;
  data: PortfolioData;
}
