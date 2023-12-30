import { z } from "zod";

import { tagDatas } from "@/app/constants/datas/tags";
import { INVALID_OPERATION_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { CommentValidationErrorMessages } from "@/app/constants/errors/portfolio/comments/Messages";

const validTagIds: number[] = tagDatas.map((item) => item.id);

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
