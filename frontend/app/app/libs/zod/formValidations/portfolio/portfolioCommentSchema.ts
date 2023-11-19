import { z } from "zod";

import { CommentValidationErrorMessages } from "@/app/constants/errors/portfolio/comments/Messages";

export const PortfolioCommentSchema = z.object({
  content: z
    .string()
    .min(1, CommentValidationErrorMessages.contentRequired)
    .max(255, CommentValidationErrorMessages.contentTooLong)
});
