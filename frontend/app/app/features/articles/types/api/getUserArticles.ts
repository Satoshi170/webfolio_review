import type { UserDataWithoutGoodsAndComments } from "@/app/types/auth";
import type { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

export interface GetUserArticlesResponseData {
  user: UserDataWithoutGoodsAndComments;
  articles: PortfolioData[] | [];
}

export interface GetUserArticlesSuccessData {
  status: "success";
  message: string;
  data: GetUserArticlesResponseData;
}
