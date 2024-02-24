import { mockUnauthorizedResponse } from "@/__tests__/fixtures/auth/unauthorizedResponseData";
import { mockUnexpectedResponse } from "@/__tests__/fixtures/unexpectedResponseData";
import { mockApi, mockAxios, mockDelete } from "@/__tests__/mocks/axios/api";
import { mockAddAuthInfoToRequest } from "@/__tests__/mocks/cookie/mockLoadAuthInfo";
import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";

import { deleteArticle } from "../deleteArticle";

import type { DeletePortfoliosByIdSuccessData } from "@/app/types/axios/portfolio/deletePortfoliosById";

jest.mock("@/app/libs/cookie/loadAuthInfo", () => mockAddAuthInfoToRequest);
jest.mock("@/app/libs/axios/api", () => mockApi);

describe("deleteArticle", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("リクエストに成功した時", () => {
    const mockDeletePortfoliosByIdSuccessData: DeletePortfoliosByIdSuccessData = {
      status: "success",
      message: "successMessage"
    };

    const mockDeletePortfoliosByIdSuccessResponse = {
      data: mockDeletePortfoliosByIdSuccessData
    };

    it("エラーをスローしない", async () => {
      mockDelete.mockResolvedValue(mockDeletePortfoliosByIdSuccessResponse);
      await expect(deleteArticle(1)).resolves.not.toThrow();
    });
  });

  describe("リクエストに失敗した時", () => {
    describe("エラーがAxiosから発生した場合", () => {
      beforeEach(() => {
        mockAxios.isAxiosError.mockReturnValue(true);
      });

      describe("レスポンスデータの型がUnauthorizedResponseDataを満たす場合", () => {
        it("適切なエラーがスローされる", async () => {
          mockDelete.mockRejectedValue(mockUnauthorizedResponse);
          await expect(deleteArticle(1)).rejects.toThrow(
            mockUnauthorizedResponse.response.data.errors.join(", ")
          );
        });
      });

      describe("レスポンスデータの型がUnauthorizedResponseDataを満たさない場合", () => {
        it("適切なエラーがスローされる", async () => {
          mockDelete.mockRejectedValue(mockUnexpectedResponse);
          await expect(deleteArticle(1)).rejects.toThrow(UNEXPECTED_ERROR_MESSAGE);
        });
      });
    });
  });

  describe("エラーがAxios以外から発生した場合", () => {
    beforeEach(() => {
      mockAxios.isAxiosError.mockReturnValue(false);
    });

    it("元のエラーがスローされる", async () => {
      const mockError = new Error("networkError");
      mockDelete.mockRejectedValue(mockError);
      await expect(deleteArticle(1)).rejects.toThrow("networkError");
    });
  });
});
