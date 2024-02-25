import type { PatchPortfoliosByIdFailedDataSchema } from "@/app/libs/zod/apiErrorResponses/portfolio/patchPortfoliosByIdDataSchema";
import type { UnauthorizedResponseData } from "@/app/types/auth";
import type { z } from "zod";

export interface PatchArticleParams {
  title?: string;
  content?: string;
}

export interface PatchArticleSuccessData {
  status: "success";
  message: string;
}

export type PatchArticleFailedData = z.infer<typeof PatchPortfoliosByIdFailedDataSchema>;

export type PatchArticleErrorData = PatchArticleFailedData | UnauthorizedResponseData;

export type PatchPortfoliosByIdData = PatchArticleSuccessData | PatchArticleErrorData;
