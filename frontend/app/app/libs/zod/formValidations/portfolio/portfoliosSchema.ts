import { z } from "zod";

import { PortfolioValidationErrorMessages } from "@/app/constants/errors/portfolio/Messages";

export const PortfoliosSchema = z.object({
  title: z
    .string()
    .min(1, PortfolioValidationErrorMessages.titleRequired)
    .max(25, PortfolioValidationErrorMessages.titleTooLong),
  content: z
    .string()
    .min(1, PortfolioValidationErrorMessages.contentRequired)
    .max(255, PortfolioValidationErrorMessages.contentTooLong)
});
