import type { PortfolioData } from "../portfolioData";
import type { UserDataWithoutGoodsAndComments } from "@/app/types/auth";

export interface GetUserPortfoliosResponseData {
  user: UserDataWithoutGoodsAndComments;
  portfolios: PortfolioData[] | [];
}

export interface GetUserPortfoliosResponse {
  status: "success";
  message: string;
  data: GetUserPortfoliosResponseData;
}
