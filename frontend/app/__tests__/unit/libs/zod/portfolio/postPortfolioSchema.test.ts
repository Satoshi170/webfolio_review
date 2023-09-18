import { ZodError } from "zod";

import { validPostPortfolioData } from "@/__tests__/fixtures/portfolio/validPostPortfolioData";
import {
  getErrorMessages,
  getErrorMessagesProps
} from "@/__tests__/helpers/zodTestHelpers";
import { postPortfolioValidationErrorMessages } from "@/app/constants/portfolio/postPortfolio/Messages";
import { postPortfolioSchema } from "@/app/libs/zod/portfolio/postPortfolioSchema";
import { PostPortfolioParams } from "@/app/types/axios/portfolio/postPortfolio";

const getPostPortfolioErrorMessages = (
  data: PostPortfolioParams,
  field: keyof PostPortfolioParams
) => {
  const props: getErrorMessagesProps<PostPortfolioParams> = {
    schema: postPortfolioSchema,
    data,
    field
  };
  return getErrorMessages(props);
};

describe("signUpSchema", () => {
  it("全て正しい形式の場合エラーをスローしない", () => {
    expect(() => postPortfolioSchema.parse(validPostPortfolioData)).not.toThrow();
  });

  describe("title", () => {
    it("titleが入力されていない時、正しいエラーメッセージをスローする", () => {
      const invalidTitleData = { ...validPostPortfolioData, title: "" };
      expect(() => postPortfolioSchema.parse(invalidTitleData)).toThrow(ZodError);
      const titleErrors = getPostPortfolioErrorMessages(invalidTitleData, "title");
      expect(titleErrors[0]).toBe(postPortfolioValidationErrorMessages.titleRequired);
    });

    it("titleが26文字以上の時、正しいエラーメッセージをスローする", () => {
      const invalidTitleData = { ...validPostPortfolioData, title: "a".repeat(26) };
      expect(() => postPortfolioSchema.parse(invalidTitleData)).toThrow(ZodError);
      const titleErrors = getPostPortfolioErrorMessages(invalidTitleData, "title");
      expect(titleErrors[0]).toBe(postPortfolioValidationErrorMessages.titleTooLong);
    });
  });

  describe("content", () => {
    it("contentが入力されていない時、正しいエラーメッセージをスローする", () => {
      const invalidContentData = { ...validPostPortfolioData, content: "" };
      expect(() => postPortfolioSchema.parse(invalidContentData)).toThrow(ZodError);
      const contentErrors = getPostPortfolioErrorMessages(invalidContentData, "content");
      expect(contentErrors[0]).toBe(postPortfolioValidationErrorMessages.contentRequired);
    });

    it("contentが501文字以上の時、正しいエラーメッセージをスローする", () => {
      const invalidContentData = { ...validPostPortfolioData, content: "a".repeat(501) };
      expect(() => postPortfolioSchema.parse(invalidContentData)).toThrow(ZodError);
      const contentErrors = getPostPortfolioErrorMessages(invalidContentData, "content");
      expect(contentErrors[0]).toBe(postPortfolioValidationErrorMessages.contentTooLong);
    });
  });
});
