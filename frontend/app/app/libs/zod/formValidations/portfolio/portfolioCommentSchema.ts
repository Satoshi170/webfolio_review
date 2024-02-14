import { z } from "zod";

import { candidateTagData } from "@/app/constants/datas/portfolios/comments/tags";
import { INVALID_OPERATION_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { CommentValidationErrorMessages } from "@/app/constants/errors/portfolio/comments/Messages";

const validTagIds: number[] = Object.values(candidateTagData);

const tagIdSchema = z
  .string()
  .transform((str) => parseInt(str, 10))
  .refine((num) => validTagIds.includes(num), {
    message: INVALID_OPERATION_ERROR_MESSAGE
  });

export const PortfolioCommentSchema = z.object({
  content: z
    .string()
    .min(1, CommentValidationErrorMessages.contentRequired)
    .max(255, CommentValidationErrorMessages.contentTooLong),
  tagIds: z.array(tagIdSchema).refine((data) => new Set(data).size === data.length, {
    message: INVALID_OPERATION_ERROR_MESSAGE
  })
});
