import { z } from "zod";

import { PostPortfoliosFailedDataSchema } from "@/app/libs/zod/apiErrorResponses/portfolio/postPortfoliosDataSchema";

import { UnauthorizedResponseData } from "../../auth";

export interface PostPortfoliosParams {
  title: string;
  content: string;
}

export interface PostPortfoliosSuccessData {
  status: "success";
  message: string;
}

export type PostPortfoliosFailedData = z.infer<typeof PostPortfoliosFailedDataSchema>;
export type PostPortfoliosErrorData = PostPortfoliosFailedData | UnauthorizedResponseData;
export type PostPortfoliosData = PostPortfoliosSuccessData | PostPortfoliosErrorData;
