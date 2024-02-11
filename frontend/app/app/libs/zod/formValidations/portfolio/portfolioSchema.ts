import { z } from "zod";

import { operationStatuses } from "@/app/constants/datas/portfolios/operationStatuses";
import {
  INVALID_OPERATION_ERROR_MESSAGE,
  MUST_BE_URL_ERROR_MESSAGE
} from "@/app/constants/errors/Messages";
import { PortfolioValidationErrorMessages } from "@/app/constants/errors/portfolio/Messages";

const validOperationStatusValues = operationStatuses.map((item) => String(item.key));

export const PortfolioSchema = z.object({
  title: z
    .string()
    .min(1, PortfolioValidationErrorMessages.titleRequired)
    .max(25, PortfolioValidationErrorMessages.titleTooLong),
  content: z
    .string()
    .min(1, PortfolioValidationErrorMessages.contentRequired)
    .max(255, PortfolioValidationErrorMessages.contentTooLong),
  operationStatus: z.string().refine((str) => validOperationStatusValues.includes(str), {
    message: INVALID_OPERATION_ERROR_MESSAGE
  }),
  portfolioSiteUrl: z
    .string()
    .min(1, PortfolioValidationErrorMessages.portfolioSiteUrlRequired)
    .url(MUST_BE_URL_ERROR_MESSAGE),
  repositoryUrl: z.preprocess(
    (val) => {
      return val === "" ? null : val;
    },
    z.string().url({ message: MUST_BE_URL_ERROR_MESSAGE }).nullish()
  )
});
