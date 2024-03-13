import { validArticleData } from "@/__tests__/fixtures/articles/validArticleData";
import { validPostArticleData } from "@/__tests__/fixtures/articles/validPostArticleData";
import { mockUnauthorizedResponse } from "@/__tests__/fixtures/auth/unauthorizedResponseData";
import { mockUnexpectedResponse } from "@/__tests__/fixtures/unexpectedResponseData";
import { mockApi, mockAxios, mockPatch } from "@/__tests__/mocks/axios/api";
import { mockAddAuthInfoToRequest } from "@/__tests__/mocks/cookie/mockLoadAuthInfo";
import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";

import { patchArticle } from "../patchArticle";

import type { PatchArticleFailedData } from "../../types/api/patchArticle";

jest.mock("@/app/libs/cookie/loadAuthInfo", () => mockAddAuthInfoToRequest);
jest.mock("@/app/libs/axios/api", () => mockApi);

describe("patchArticle", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("リクエストに成功した時", () => {
    const mockPatchArticleSuccessResponse = {
      data: validArticleData
    };

    it("エラーをスローしない", async () => {
      mockPatch.mockResolvedValue(mockPatchArticleSuccessResponse);
      await expect(patchArticle(1, validPostArticleData)).resolves.not.toThrow();
    });
  });

  describe("リクエストに失敗した時", () => {
    describe("エラーがAxiosから発生した場合", () => {
      describe("レスポンスデータの型がUnauthorizedResponseDataを満たす場合", () => {
        it("適切なエラーがスローされる", async () => {
          mockAxios.isAxiosError.mockReturnValue(true);
          mockPatch.mockRejectedValue(mockUnauthorizedResponse);
          await expect(patchArticle(1, validPostArticleData)).rejects.toThrow(
            mockUnauthorizedResponse.response.data.errors.join(", ")
          );
        });
      });

      describe("レスポンスデータの型がPatchPortfoliosByIdFailedDataを満たす場合", () => {
        const mockPatchPortfoliosByIdFailedData: PatchArticleFailedData = {
          status: "error",
          message: "failed",
          errors: ["failed"]
        };

        const mockPatchPortfoliosByIdFailedResponse = {
          response: {
            data: mockPatchPortfoliosByIdFailedData
          }
        };

        it("適切なエラーがスローされる", async () => {
          mockAxios.isAxiosError.mockReturnValue(true);
          mockPatch.mockRejectedValue(mockPatchPortfoliosByIdFailedResponse);
          await expect(patchArticle(1, validPostArticleData)).rejects.toThrow(
            mockPatchPortfoliosByIdFailedData.errors.join(", ")
          );
        });
      });

      describe("レスポンスデータの型がどちらも満たさない場合", () => {
        it("適切なエラーがスローされる", async () => {
          mockAxios.isAxiosError.mockReturnValue(true);
          mockPatch.mockRejectedValue(mockUnexpectedResponse);
          await expect(patchArticle(1, validPostArticleData)).rejects.toThrow(
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
      mockPatch.mockRejectedValue(mockError);
      await expect(patchArticle(1, validPostArticleData)).rejects.toThrow("networkError");
    });
  });
});
