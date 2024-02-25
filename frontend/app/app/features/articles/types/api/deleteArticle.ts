import type { UnauthorizedResponseData } from "@/app/types/auth";

export interface DeleteArticleSuccessData {
  status: "success";
  message: string;
}
export type DeleteArticleErrorData = UnauthorizedResponseData;

export type DeletePortfoliosData = DeleteArticleSuccessData | DeleteArticleErrorData;
