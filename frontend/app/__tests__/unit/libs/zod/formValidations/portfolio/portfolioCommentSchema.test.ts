import { ZodError } from "zod";

import { validPortfolioCommentData } from "@/__tests__/fixtures/portfolio/validPortfolioCommentData";
import { getErrorMessages } from "@/__tests__/helpers/zodTestHelpers";
import { INVALID_OPERATION_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { CommentValidationErrorMessages } from "@/app/constants/errors/portfolio/comments/Messages";
import { PortfolioCommentSchema } from "@/app/libs/zod/formValidations/portfolio/portfolioCommentSchema";

import type { getErrorMessagesProps } from "@/__tests__/helpers/zodTestHelpers";
import type { PostCommentFormParams } from "@/app/types/axios/portfolio/comment/comment";

const getValidationErrorMessages = (
  data: PostCommentFormParams,
  field: keyof PostCommentFormParams
) => {
  const props: getErrorMessagesProps<PostCommentFormParams> = {
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

  describe("tagIds", () => {
    it("tagIdsに重複している要素がある場合正しいエラーをスローする", () => {
      const invalidContentData = {
        ...validPortfolioCommentData,
        tagIds: ["1", "1"]
      };
      expect(() => PortfolioCommentSchema.parse(invalidContentData)).toThrow(ZodError);
      const contentErrors = getValidationErrorMessages(invalidContentData, "tagIds");
      expect(contentErrors[0]).toBe(INVALID_OPERATION_ERROR_MESSAGE);
    });

    it("tagIdが許可されていない値の場合正しいエラーをスローする", () => {
      const invalidContentData = {
        ...validPortfolioCommentData,
        tagIds: ["1", "3"]
      };
      expect(() => PortfolioCommentSchema.parse(invalidContentData)).toThrow(ZodError);
      const contentErrors = getValidationErrorMessages(invalidContentData, "tagIds");
      expect(contentErrors[0]).toBe(INVALID_OPERATION_ERROR_MESSAGE);
    });
  });
});
