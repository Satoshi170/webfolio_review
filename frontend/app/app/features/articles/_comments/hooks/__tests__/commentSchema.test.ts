import { ZodError } from "zod";

import { validPortfolioCommentData } from "@/__tests__/fixtures/portfolio/validPortfolioCommentData";
import { getErrorMessages } from "@/__tests__/helpers/zodTestHelpers";
import { INVALID_OPERATION_ERROR_MESSAGE } from "@/app/constants/errors/Messages";

import { CommentSchema } from "../commentSchema";
import { CommentValidationErrorMessages } from "../messages";

import type { CommentFormParams } from "../../types/api";
import type { getErrorMessagesProps } from "@/__tests__/helpers/zodTestHelpers";

const getValidationErrorMessages = (
  data: CommentFormParams,
  field: keyof CommentFormParams
) => {
  const props: getErrorMessagesProps<CommentFormParams> = {
    schema: CommentSchema,
    data,
    field
  };
  return getErrorMessages(props);
};

describe("CommentSchema", () => {
  it("正しい形式の場合エラーをスローしない", () => {
    expect(() => CommentSchema.parse(validPortfolioCommentData)).not.toThrow();
  });

  describe("content", () => {
    it("contentが入力されていない時、正しいエラーメッセージをスローする", () => {
      const invalidContentData = { ...validPortfolioCommentData, content: "" };
      expect(() => CommentSchema.parse(invalidContentData)).toThrow(ZodError);
      const contentErrors = getValidationErrorMessages(invalidContentData, "content");
      expect(contentErrors[0]).toBe(CommentValidationErrorMessages.contentRequired);
    });

    it("contentが256文字以上の時、正しいエラーメッセージをスローする", () => {
      const invalidContentData = {
        ...validPortfolioCommentData,
        content: "a".repeat(256)
      };
      expect(() => CommentSchema.parse(invalidContentData)).toThrow(ZodError);
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
      expect(() => CommentSchema.parse(invalidContentData)).toThrow(ZodError);
      const contentErrors = getValidationErrorMessages(invalidContentData, "tagIds");
      expect(contentErrors[0]).toBe(INVALID_OPERATION_ERROR_MESSAGE);
    });

    it("tagIdが許可されていない値の場合正しいエラーをスローする", () => {
      const invalidContentData = {
        ...validPortfolioCommentData,
        tagIds: ["1", "3"]
      };
      expect(() => CommentSchema.parse(invalidContentData)).toThrow(ZodError);
      const contentErrors = getValidationErrorMessages(invalidContentData, "tagIds");
      expect(contentErrors[0]).toBe(INVALID_OPERATION_ERROR_MESSAGE);
    });
  });
});
