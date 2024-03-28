import { ZodError } from "zod";

import { validPostArticleData } from "@/__tests__/fixtures/articles/validPostArticleData";
import { getErrorMessages } from "@/__tests__/helpers/zodTestHelpers";
import {
  INVALID_OPERATION_ERROR_MESSAGE,
  MUST_BE_URL_ERROR_MESSAGE
} from "@/app/constants/errors/Messages";

import { ArticleSchema } from "../articleSchema";
import { ArticleValidationErrorMessages } from "../messages";

import type { PostArticleParams } from "../../types/api/postArticle";
import type { getErrorMessagesProps } from "@/__tests__/helpers/zodTestHelpers";

const validationErrorMessages = (
  data: PostArticleParams,
  field: keyof PostArticleParams
) => {
  const props: getErrorMessagesProps<PostArticleParams> = {
    schema: ArticleSchema,
    data,
    field
  };
  return getErrorMessages(props);
};

describe("ArticleSchema", () => {
  it("全て正しい形式の場合エラーをスローしない", () => {
    expect(() => ArticleSchema.parse(validPostArticleData)).not.toThrow();
  });

  describe("title", () => {
    it("titleが入力されていない時、正しいエラーメッセージをスローする", () => {
      const invalidTitleData = { ...validPostArticleData, title: "" };
      expect(() => ArticleSchema.parse(invalidTitleData)).toThrow(ZodError);
      const titleErrors = validationErrorMessages(invalidTitleData, "title");
      expect(titleErrors[0]).toBe(ArticleValidationErrorMessages.titleRequired);
    });

    it("titleが76文字以上の時、正しいエラーメッセージをスローする", () => {
      const invalidTitleData = { ...validPostArticleData, title: "a".repeat(76) };
      expect(() => ArticleSchema.parse(invalidTitleData)).toThrow(ZodError);
      const titleErrors = validationErrorMessages(invalidTitleData, "title");
      expect(titleErrors[0]).toBe(ArticleValidationErrorMessages.titleTooLong);
    });
  });

  describe("content", () => {
    it("contentが入力されていない時、正しいエラーメッセージをスローする", () => {
      const invalidContentData = { ...validPostArticleData, content: "" };
      expect(() => ArticleSchema.parse(invalidContentData)).toThrow(ZodError);
      const contentErrors = validationErrorMessages(invalidContentData, "content");
      expect(contentErrors[0]).toBe(ArticleValidationErrorMessages.contentRequired);
    });

    it("contentが256文字以上の時、正しいエラーメッセージをスローする", () => {
      const invalidContentData = { ...validPostArticleData, content: "a".repeat(256) };
      expect(() => ArticleSchema.parse(invalidContentData)).toThrow(ZodError);
      const contentErrors = validationErrorMessages(invalidContentData, "content");
      expect(contentErrors[0]).toBe(ArticleValidationErrorMessages.contentTooLong);
    });
  });

  describe("operationStatus", () => {
    it("operationが規定外の時、正しいエラーメッセージをスローする", () => {
      const invalidOperationStatusData = {
        ...validPostArticleData,
        operationStatus: "test"
      };
      expect(() => ArticleSchema.parse(invalidOperationStatusData)).toThrow(ZodError);
      const OperationStatusErrors = validationErrorMessages(
        invalidOperationStatusData,
        "operationStatus"
      );
      expect(OperationStatusErrors[0]).toBe(INVALID_OPERATION_ERROR_MESSAGE);
    });
  });

  describe("portfolioSiteUrl", () => {
    it("portfolioSiteUrlが入力されていない時、正しいエラーメッセージをスローする", () => {
      const invalidPortfolioSiteUrlData = {
        ...validPostArticleData,
        portfolioSiteUrl: ""
      };
      expect(() => ArticleSchema.parse(invalidPortfolioSiteUrlData)).toThrow(ZodError);
      const portfolioSiteUrlErrors = validationErrorMessages(
        invalidPortfolioSiteUrlData,
        "portfolioSiteUrl"
      );
      expect(portfolioSiteUrlErrors[0]).toBe(
        ArticleValidationErrorMessages.portfolioSiteUrlRequired
      );
    });

    it("portfolioSiteUrlがURLでない時、正しいエラーメッセージをスローする", () => {
      const invalidPortfolioSiteUrlData = {
        ...validPostArticleData,
        portfolioSiteUrl: "test"
      };
      expect(() => ArticleSchema.parse(invalidPortfolioSiteUrlData)).toThrow(ZodError);
      const portfolioSiteUrlErrors = validationErrorMessages(
        invalidPortfolioSiteUrlData,
        "portfolioSiteUrl"
      );
      expect(portfolioSiteUrlErrors[0]).toBe(MUST_BE_URL_ERROR_MESSAGE);
    });
  });

  describe("repositoryUrl", () => {
    it("repositoryUrlが入力されていない時、エラーをスローしない", () => {
      const invalidRepositoryUrlData = {
        ...validPostArticleData,
        repositoryUrl: ""
      };
      expect(() => ArticleSchema.parse(invalidRepositoryUrlData)).not.toThrow();
    });

    it("repositoryUrlがURLでない時、正しいエラーメッセージをスローする", () => {
      const invalidRepositoryUrlData = {
        ...validPostArticleData,
        repositoryUrl: "test"
      };
      expect(() => ArticleSchema.parse(invalidRepositoryUrlData)).toThrow(ZodError);
      const repositoryUrlErrors = validationErrorMessages(
        invalidRepositoryUrlData,
        "repositoryUrl"
      );
      expect(repositoryUrlErrors[0]).toBe(MUST_BE_URL_ERROR_MESSAGE);
    });
  });
});
