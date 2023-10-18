import { z } from "zod";

import { PatchPortfoliosByIdFailedDataSchema } from "@/app/libs/zod/apiErrorResponses/portfolio/patchPortfoliosByIdDataSchema";

import { UnauthorizedResponseData } from "../../auth";

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
