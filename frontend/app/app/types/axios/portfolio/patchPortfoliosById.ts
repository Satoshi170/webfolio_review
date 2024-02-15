import type { UnauthorizedResponseData } from "../../auth";
import type { PatchPortfoliosByIdFailedDataSchema } from "@/app/libs/zod/apiErrorResponses/portfolio/patchPortfoliosByIdDataSchema";
import type { z } from "zod";

export interface PatchPortfoliosByIdParams {
  title?: string;
  content?: string;
}

export interface PatchPortfoliosByIdSuccessData {
  status: "success";
  message: string;
}

export type PatchPortfoliosByIdFailedData = z.infer<
  typeof PatchPortfoliosByIdFailedDataSchema
>;

export type PatchPortfoliosByIdErrorData =
  | PatchPortfoliosByIdFailedData
  | UnauthorizedResponseData;

export type PatchPortfoliosByIdData =
  | PatchPortfoliosByIdSuccessData
  | PatchPortfoliosByIdErrorData;
