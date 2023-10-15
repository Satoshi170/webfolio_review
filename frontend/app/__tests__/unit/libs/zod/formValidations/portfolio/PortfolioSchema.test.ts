import { ZodError } from "zod";

import { validPostPortfoliosData } from "@/__tests__/fixtures/portfolio/validPostPortfolioData";
import {
  getErrorMessages,
  getErrorMessagesProps
} from "@/__tests__/helpers/zodTestHelpers";
import { PortfolioValidationErrorMessages } from "@/app/constants/errors/portfolio/Messages";
import { PortfoliosSchema } from "@/app/libs/zod/formValidations/portfolio/portfoliosSchema";
import { PostPortfoliosParams } from "@/app/types/axios/portfolio/postPortfolios";

const getPostPortfolioErrorMessages = (
  data: PostPortfoliosParams,
  field: keyof PostPortfoliosParams
) => {
  const props: getErrorMessagesProps<PostPortfoliosParams> = {
    schema: PortfoliosSchema,
    data,
    field
  };
  return getErrorMessages(props);
};

describe("signUpSchema", () => {
  it("全て正しい形式の場合エラーをスローしない", () => {
    expect(() => PortfoliosSchema.parse(validPostPortfoliosData)).not.toThrow();
  });

  describe("title", () => {
    it("titleが入力されていない時、正しいエラーメッセージをスローする", () => {
      const invalidTitleData = { ...validPostPortfoliosData, title: "" };
      expect(() => PortfoliosSchema.parse(invalidTitleData)).toThrow(ZodError);
      const titleErrors = getPostPortfolioErrorMessages(invalidTitleData, "title");
      expect(titleErrors[0]).toBe(PortfolioValidationErrorMessages.titleRequired);
    });

    it("titleが26文字以上の時、正しいエラーメッセージをスローする", () => {
      const invalidTitleData = { ...validPostPortfoliosData, title: "a".repeat(26) };
      expect(() => PortfoliosSchema.parse(invalidTitleData)).toThrow(ZodError);
      const titleErrors = getPostPortfolioErrorMessages(invalidTitleData, "title");
      expect(titleErrors[0]).toBe(PortfolioValidationErrorMessages.titleTooLong);
    });
  });

  describe("content", () => {
    it("contentが入力されていない時、正しいエラーメッセージをスローする", () => {
      const invalidContentData = { ...validPostPortfoliosData, content: "" };
      expect(() => PortfoliosSchema.parse(invalidContentData)).toThrow(ZodError);
      const contentErrors = getPostPortfolioErrorMessages(invalidContentData, "content");
      expect(contentErrors[0]).toBe(PortfolioValidationErrorMessages.contentRequired);
    });

    it("contentが501文字以上の時、正しいエラーメッセージをスローする", () => {
      const invalidContentData = { ...validPostPortfoliosData, content: "a".repeat(501) };
      expect(() => PortfoliosSchema.parse(invalidContentData)).toThrow(ZodError);
      const contentErrors = getPostPortfolioErrorMessages(invalidContentData, "content");
      expect(contentErrors[0]).toBe(PortfolioValidationErrorMessages.contentTooLong);
    });
  });
});
