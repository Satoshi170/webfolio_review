import { ZodError } from "zod";

import { validPostPortfoliosData } from "@/__tests__/fixtures/portfolio/validPostPortfolioData";
import { getErrorMessages } from "@/__tests__/helpers/zodTestHelpers";
import {
  INVALID_OPERATION_ERROR_MESSAGE,
  MUST_BE_URL_ERROR_MESSAGE
} from "@/app/constants/errors/Messages";
import { PortfolioValidationErrorMessages } from "@/app/constants/errors/portfolio/Messages";
import { PortfolioSchema } from "@/app/libs/zod/formValidations/portfolio/portfolioSchema";

import type { getErrorMessagesProps } from "@/__tests__/helpers/zodTestHelpers";
import type { PostPortfoliosParams } from "@/app/types/axios/portfolio/postPortfolios";

const getPostPortfolioErrorMessages = (
  data: PostPortfoliosParams,
  field: keyof PostPortfoliosParams
) => {
  const props: getErrorMessagesProps<PostPortfoliosParams> = {
    schema: PortfolioSchema,
    data,
    field
  };
  return getErrorMessages(props);
};

describe("PortfolioSchema", () => {
  it("全て正しい形式の場合エラーをスローしない", () => {
    expect(() => PortfolioSchema.parse(validPostPortfoliosData)).not.toThrow();
  });

  describe("title", () => {
    it("titleが入力されていない時、正しいエラーメッセージをスローする", () => {
      const invalidTitleData = { ...validPostPortfoliosData, title: "" };
      expect(() => PortfolioSchema.parse(invalidTitleData)).toThrow(ZodError);
      const titleErrors = getPostPortfolioErrorMessages(invalidTitleData, "title");
      expect(titleErrors[0]).toBe(PortfolioValidationErrorMessages.titleRequired);
    });

    it("titleが26文字以上の時、正しいエラーメッセージをスローする", () => {
      const invalidTitleData = { ...validPostPortfoliosData, title: "a".repeat(26) };
      expect(() => PortfolioSchema.parse(invalidTitleData)).toThrow(ZodError);
      const titleErrors = getPostPortfolioErrorMessages(invalidTitleData, "title");
      expect(titleErrors[0]).toBe(PortfolioValidationErrorMessages.titleTooLong);
    });
  });

  describe("content", () => {
    it("contentが入力されていない時、正しいエラーメッセージをスローする", () => {
      const invalidContentData = { ...validPostPortfoliosData, content: "" };
      expect(() => PortfolioSchema.parse(invalidContentData)).toThrow(ZodError);
      const contentErrors = getPostPortfolioErrorMessages(invalidContentData, "content");
      expect(contentErrors[0]).toBe(PortfolioValidationErrorMessages.contentRequired);
    });

    it("contentが256文字以上の時、正しいエラーメッセージをスローする", () => {
      const invalidContentData = { ...validPostPortfoliosData, content: "a".repeat(256) };
      expect(() => PortfolioSchema.parse(invalidContentData)).toThrow(ZodError);
      const contentErrors = getPostPortfolioErrorMessages(invalidContentData, "content");
      expect(contentErrors[0]).toBe(PortfolioValidationErrorMessages.contentTooLong);
    });
  });

  describe("operationStatus", () => {
    it("operationが規定外の時、正しいエラーメッセージをスローする", () => {
      const invalidOperationStatusData = {
        ...validPostPortfoliosData,
        operationStatus: "test"
      };
      expect(() => PortfolioSchema.parse(invalidOperationStatusData)).toThrow(ZodError);
      const OperationStatusErrors = getPostPortfolioErrorMessages(
        invalidOperationStatusData,
        "operationStatus"
      );
      expect(OperationStatusErrors[0]).toBe(INVALID_OPERATION_ERROR_MESSAGE);
    });
  });

  describe("portfolioSiteUrl", () => {
    it("portfolioSiteUrlが入力されていない時、正しいエラーメッセージをスローする", () => {
      const invalidPortfolioSiteUrlData = {
        ...validPostPortfoliosData,
        portfolioSiteUrl: ""
      };
      expect(() => PortfolioSchema.parse(invalidPortfolioSiteUrlData)).toThrow(ZodError);
      const portfolioSiteUrlErrors = getPostPortfolioErrorMessages(
        invalidPortfolioSiteUrlData,
        "portfolioSiteUrl"
      );
      expect(portfolioSiteUrlErrors[0]).toBe(
        PortfolioValidationErrorMessages.portfolioSiteUrlRequired
      );
    });

    it("portfolioSiteUrlがURLでない時、正しいエラーメッセージをスローする", () => {
      const invalidPortfolioSiteUrlData = {
        ...validPostPortfoliosData,
        portfolioSiteUrl: "test"
      };
      expect(() => PortfolioSchema.parse(invalidPortfolioSiteUrlData)).toThrow(ZodError);
      const portfolioSiteUrlErrors = getPostPortfolioErrorMessages(
        invalidPortfolioSiteUrlData,
        "portfolioSiteUrl"
      );
      expect(portfolioSiteUrlErrors[0]).toBe(MUST_BE_URL_ERROR_MESSAGE);
    });
  });

  describe("repositoryUrl", () => {
    it("repositoryUrlが入力されていない時、エラーをスローしない", () => {
      const invalidRepositoryUrlData = {
        ...validPostPortfoliosData,
        repositoryUrl: ""
      };
      expect(() => PortfolioSchema.parse(invalidRepositoryUrlData)).not.toThrow();
    });

    it("repositoryUrlがURLでない時、正しいエラーメッセージをスローする", () => {
      const invalidRepositoryUrlData = {
        ...validPostPortfoliosData,
        repositoryUrl: "test"
      };
      expect(() => PortfolioSchema.parse(invalidRepositoryUrlData)).toThrow(ZodError);
      const repositoryUrlErrors = getPostPortfolioErrorMessages(
        invalidRepositoryUrlData,
        "repositoryUrl"
      );
      expect(repositoryUrlErrors[0]).toBe(MUST_BE_URL_ERROR_MESSAGE);
    });
  });
});
