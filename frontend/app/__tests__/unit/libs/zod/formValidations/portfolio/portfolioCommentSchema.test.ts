import { ZodError } from "zod";

import { validPortfolioCommentData } from "@/__tests__/fixtures/portfolio/validPortfolioCommentData";
import {
  getErrorMessages,
  getErrorMessagesProps
} from "@/__tests__/helpers/zodTestHelpers";
import { CommentValidationErrorMessages } from "@/app/constants/errors/portfolio/comments/Messages";
import { PortfolioCommentSchema } from "@/app/libs/zod/formValidations/portfolio/portfolioCommentSchema";
import { CommentParams } from "@/app/types/axios/portfolio/comment/comment";

const getValidationErrorMessages = (data: CommentParams, field: keyof CommentParams) => {
  const props: getErrorMessagesProps<CommentParams> = {
    schema: PortfolioCommentSchema,
    data,
    field
  };
  return getErrorMessages(props);
};

describe("PortfolioCommentSchema", () => {
  it("正しい形式の場合エラーをスローしない", () => {
    expect(() => PortfolioCommentSchema.parse(validPortfolioCommentData)).not.toThrow();
  });

  describe("content", () => {
    it("contentが入力されていない時、正しいエラーメッセージをスローする", () => {
      const invalidContentData = { ...validPortfolioCommentData, content: "" };
      expect(() => PortfolioCommentSchema.parse(invalidContentData)).toThrow(ZodError);
      const contentErrors = getValidationErrorMessages(invalidContentData, "content");
      expect(contentErrors[0]).toBe(CommentValidationErrorMessages.contentRequired);
    });

    it("contentが256文字以上の時、正しいエラーメッセージをスローする", () => {
      const invalidContentData = {
        ...validPortfolioCommentData,
        content: "a".repeat(256)
      };
      expect(() => PortfolioCommentSchema.parse(invalidContentData)).toThrow(ZodError);
      const contentErrors = getValidationErrorMessages(invalidContentData, "content");
      expect(contentErrors[0]).toBe(CommentValidationErrorMessages.contentTooLong);
    });
  });
});
