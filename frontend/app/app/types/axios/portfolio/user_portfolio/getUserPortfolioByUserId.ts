import { UserDataWithoutGoodsAndComments } from "@/app/types/auth";

import { PortfolioData } from "../portfolioData";

export interface GetUserPortfoliosResponseData {
  user: UserDataWithoutGoodsAndComments;
  portfolios: PortfolioData[] | [];
}

export interface GetUserPortfoliosResponse {
  status: "success";
  message: string;
  data: GetUserPortfoliosResponseData;
}
