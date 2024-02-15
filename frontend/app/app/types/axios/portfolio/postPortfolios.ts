import type { UnauthorizedResponseData } from "../../auth";
import type { PostPortfoliosFailedDataSchema } from "@/app/libs/zod/apiErrorResponses/portfolio/postPortfoliosDataSchema";
import type { z } from "zod";

export interface PostPortfoliosParams {
  title: string;
  content: string;
  operationStatus: string;
  portfolioSiteUrl: string;
  repositoryUrl: string | null;
}

export interface PostPortfoliosSuccessData {
  status: "success";
  message: string;
}

export type PostPortfoliosFailedData = z.infer<typeof PostPortfoliosFailedDataSchema>;
export type PostPortfoliosErrorData = PostPortfoliosFailedData | UnauthorizedResponseData;
export type PostPortfoliosData = PostPortfoliosSuccessData | PostPortfoliosErrorData;
