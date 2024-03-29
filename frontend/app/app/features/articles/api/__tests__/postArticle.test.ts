import { validArticleData } from "@/__tests__/fixtures/articles/validArticleData";
import { validPostArticleData } from "@/__tests__/fixtures/articles/validPostArticleData";
import { mockUnauthorizedResponse } from "@/__tests__/fixtures/auth/unauthorizedResponseData";
import { mockUnexpectedResponse } from "@/__tests__/fixtures/unexpectedResponseData";
import { mockApi, mockAxios, mockPost } from "@/__tests__/mocks/axios/api";
import { mockAddAuthInfoToRequest } from "@/__tests__/mocks/cookie/mockLoadAuthInfo";
import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";

import { postArticle } from "../postArticle";

import type { PostArticleFailedData } from "../../types/api/postArticle";

jest.mock("@/app/libs/cookie/loadAuthInfo", () => mockAddAuthInfoToRequest);
jest.mock("@/app/libs/axios/api", () => mockApi);

describe("postArticle", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("リクエストに成功した時", () => {
    const mockPostArticlesSuccessResponse = {
      data: validArticleData
    };

    it("エラーをスローしない", async () => {
      mockPost.mockResolvedValue(mockPostArticlesSuccessResponse);
      await expect(postArticle(validPostArticleData)).resolves.not.toThrow();
    });
  });

  describe("リクエストに失敗した時", () => {
    describe("エラーがAxiosから発生した場合", () => {
      describe("レスポンスデータの型がUnauthorizedResponseDataを満たす場合", () => {
        it("適切なエラーがスローされる", async () => {
          mockAxios.isAxiosError.mockReturnValue(true);
          mockPost.mockRejectedValue(mockUnauthorizedResponse);
          await expect(postArticle(validPostArticleData)).rejects.toThrow(
            mockUnauthorizedResponse.response.data.errors.join(", ")
          );
        });
      });

      describe("レスポンスデータの型がPatchPortfoliosByIdFailedDataを満たす場合", () => {
        const mockPostArticlesFailedData: PostArticleFailedData = {
          status: "error",
          message: "failed",
          errors: ["failed"]
        };

        const mockPostPortfoliosFailedResponse = {
          response: {
            data: mockPostArticlesFailedData
          }
        };

        it("適切なエラーがスローされる", async () => {
          mockAxios.isAxiosError.mockReturnValue(true);
          mockPost.mockRejectedValue(mockPostPortfoliosFailedResponse);
          await expect(postArticle(validPostArticleData)).rejects.toThrow(
            mockPostArticlesFailedData.errors.join(", ")
          );
        });
      });

      describe("レスポンスデータの型がどちらも満たさない場合", () => {
        it("適切なエラーがスローされる", async () => {
          mockAxios.isAxiosError.mockReturnValue(true);
          mockPost.mockRejectedValue(mockUnexpectedResponse);
          await expect(postArticle(validPostArticleData)).rejects.toThrow(
            UNEXPECTED_ERROR_MESSAGE
          );
        });
      });
    });
  });

  describe("エラーがAxios以外から発生した場合", () => {
    it("元のエラーがスローされる", async () => {
      const mockError = new Error("networkError");
      mockAxios.isAxiosError.mockReturnValue(false);
      mockPost.mockRejectedValue(mockError);
      await expect(postArticle(validPostArticleData)).rejects.toThrow("networkError");
    });
  });
});
