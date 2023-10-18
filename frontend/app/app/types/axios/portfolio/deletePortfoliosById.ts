import { UnauthorizedResponseData } from "../../auth";

export interface DeletePortfoliosByIdSuccessData {
  status: "success";
  message: string;
}
export type DeletePortfoliosByIdErrorData = UnauthorizedResponseData;

export type DeletePortfoliosData =
  | DeletePortfoliosByIdSuccessData
  | DeletePortfoliosByIdErrorData;
