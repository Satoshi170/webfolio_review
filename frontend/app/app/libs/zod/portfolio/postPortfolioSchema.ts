import { z } from "zod";

import { postPortfolioValidationErrorMessages } from "@/app/constants/portfolio/postPortfolio/Messages";

export const postPortfolioSchema = z.object({
  title: z
    .string()
    .min(1, postPortfolioValidationErrorMessages.titleRequired)
    .max(25, postPortfolioValidationErrorMessages.titleTooLong),
  content: z
    .string()
    .min(1, postPortfolioValidationErrorMessages.contentRequired)
    .max(255, postPortfolioValidationErrorMessages.contentTooLong)
});
