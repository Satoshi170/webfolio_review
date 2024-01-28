import { PortfolioData } from "./portfolioData";
import { UserDataWithoutGoodsAndComments } from "../../auth";

export interface GetPortfoliosResponseData {
  user: UserDataWithoutGoodsAndComments;
  portfolios: PortfolioData[] | [];
}

export interface GetPortfoliosResponse {
  status: "success";
  message: string;
  data: GetPortfoliosResponseData;
}
