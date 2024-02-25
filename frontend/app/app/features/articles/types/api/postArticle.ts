import type { PostPortfoliosFailedDataSchema } from "@/app/libs/zod/apiErrorResponses/portfolio/postPortfoliosDataSchema";
import type { UnauthorizedResponseData } from "@/app/types/auth";
import type { z } from "zod";

export interface PostArticleParams {
  title: string;
  content: string;
  operationStatus: string;
  portfolioSiteUrl: string;
  repositoryUrl: string | null;
}

export interface PostArticleSuccessData {
  status: "success";
  message: string;
}

export type PostArticleFailedData = z.infer<typeof PostPortfoliosFailedDataSchema>;
export type PostArticleErrorData = PostArticleFailedData | UnauthorizedResponseData;
export type PostArticleData = PostArticleSuccessData | PostArticleErrorData;
