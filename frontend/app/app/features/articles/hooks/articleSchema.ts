import { z } from "zod";

import { candidateOperationStatusData } from "@/app/constants/datas/portfolios/operationStatuses";
import {
  INVALID_OPERATION_ERROR_MESSAGE,
  MUST_BE_URL_ERROR_MESSAGE
} from "@/app/constants/errors/Messages";

import { ArticleValidationErrorMessages } from "./messages";

const validOperationStatusValues = Object.values(candidateOperationStatusData);
const validOperationStatusStringValues = validOperationStatusValues.map((num) =>
  num.toString()
);

export const ArticleSchema = z.object({
  title: z
    .string()
    .min(1, ArticleValidationErrorMessages.titleRequired)
    .max(25, ArticleValidationErrorMessages.titleTooLong),
  content: z
    .string()
    .min(1, ArticleValidationErrorMessages.contentRequired)
    .max(255, ArticleValidationErrorMessages.contentTooLong),
  operationStatus: z
    .string()
    .refine((str) => validOperationStatusStringValues.includes(str), {
      message: INVALID_OPERATION_ERROR_MESSAGE
    }),
  portfolioSiteUrl: z
    .string()
    .min(1, ArticleValidationErrorMessages.portfolioSiteUrlRequired)
    .url(MUST_BE_URL_ERROR_MESSAGE),
  repositoryUrl: z.preprocess(
    (val) => {
      return val === "" ? null : val;
    },
    z.string().url({ message: MUST_BE_URL_ERROR_MESSAGE }).nullish()
  )
});
