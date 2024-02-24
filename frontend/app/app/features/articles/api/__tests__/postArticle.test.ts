import { mockUnauthorizedResponse } from "@/__tests__/fixtures/auth/unauthorizedResponseData";
import { validPostPortfoliosData } from "@/__tests__/fixtures/portfolio/validPostPortfolioData";
import { mockUnexpectedResponse } from "@/__tests__/fixtures/unexpectedResponseData";
import { mockApi, mockAxios, mockPost } from "@/__tests__/mocks/axios/api";
import { mockAddAuthInfoToRequest } from "@/__tests__/mocks/cookie/mockLoadAuthInfo";
import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";

import { postArticle } from "../postArticle";

import type {
  PostPortfoliosSuccessData,
  PostPortfoliosFailedData
} from "@/app/types/axios/portfolio/postPortfolios";

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
    const mockPostPortfoliosByIdSuccessData: PostPortfoliosSuccessData = {
      status: "success",
      message: "successMessage"
    };

    const mockPostPortfoliosSuccessResponse = {
      data: mockPostPortfoliosByIdSuccessData
    };

    it("エラーをスローしない", async () => {
      mockPost.mockResolvedValue(mockPostPortfoliosSuccessResponse);
      await expect(postArticle(validPostPortfoliosData)).resolves.not.toThrow();
    });
  });

  describe("リクエストに失敗した時", () => {
    describe("エラーがAxiosから発生した場合", () => {
      describe("レスポンスデータの型がUnauthorizedResponseDataを満たす場合", () => {
        it("適切なエラーがスローされる", async () => {
          mockAxios.isAxiosError.mockReturnValue(true);
          mockPost.mockRejectedValue(mockUnauthorizedResponse);
          await expect(postArticle(validPostPortfoliosData)).rejects.toThrow(
            mockUnauthorizedResponse.response.data.errors.join(", ")
          );
        });
      });

      describe("レスポンスデータの型がPatchPortfoliosByIdFailedDataを満たす場合", () => {
        const mockPostPortfoliosFailedData: PostPortfoliosFailedData = {
          status: "error",
          message: "failed",
          errors: ["failed"]
        };

        const mockPostPortfoliosFailedResponse = {
          response: {
            data: mockPostPortfoliosFailedData
          }
        };

        it("適切なエラーがスローされる", async () => {
          mockAxios.isAxiosError.mockReturnValue(true);
          mockPost.mockRejectedValue(mockPostPortfoliosFailedResponse);
          await expect(postArticle(validPostPortfoliosData)).rejects.toThrow(
            mockPostPortfoliosFailedData.errors.join(", ")
          );
        });
      });

      describe("レスポンスデータの型がどちらも満たさない場合", () => {
        it("適切なエラーがスローされる", async () => {
          mockAxios.isAxiosError.mockReturnValue(true);
          mockPost.mockRejectedValue(mockUnexpectedResponse);
          await expect(postArticle(validPostPortfoliosData)).rejects.toThrow(
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
      await expect(postArticle(validPostPortfoliosData)).rejects.toThrow("networkError");
    });
  });
});
