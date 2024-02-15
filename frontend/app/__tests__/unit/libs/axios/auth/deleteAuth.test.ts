import { mockUnauthorizedResponse } from "@/__tests__/fixtures/auth/unauthorizedResponseData";
import { mockUnexpectedResponse } from "@/__tests__/fixtures/unexpectedResponseData";
import { mockApi, mockAxios, mockDelete } from "@/__tests__/mocks/axios/api";
import { mockAddAuthInfoToRequest } from "@/__tests__/mocks/cookie/mockLoadAuthInfo";
import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { deleteAuth } from "@/app/libs/axios/auth/deleteAuth";
import { removeAuthInfo } from "@/app/libs/cookie/removeAuthInfo";

import type { DeleteAuthSuccessData } from "@/app/types/axios/auth/deleteAuth";

jest.mock("@/app/libs/cookie/removeAuthInfo");
jest.mock("@/app/libs/cookie/loadAuthInfo", () => mockAddAuthInfoToRequest);
jest.mock("@/app/libs/axios/api", () => mockApi);

describe("deleteAuth", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("リクエストに成功した時", () => {
    const mockDeleteAuthSuccessData: DeleteAuthSuccessData = {
      status: "success",
      messages: "Success message"
    };

    const mockDeleteAuthSuccessResponse = {
      data: mockDeleteAuthSuccessData
    };

    it("エラーをスローせずremoveAuthInfoが呼び出せれる", async () => {
      mockDelete.mockResolvedValue(mockDeleteAuthSuccessResponse);
      await expect(deleteAuth()).resolves.not.toThrow();
      await deleteAuth();
      expect(removeAuthInfo).toHaveBeenCalled();
    });
  });

  describe("リクエストに失敗した時", () => {
    describe("エラーがAxiosから発生した場合", () => {
      describe("レスポンスデータの型がUnauthorizedResponseDataを満たす場合", () => {
        it("適切なエラーメッセージがスローされる", async () => {
          mockAxios.isAxiosError.mockReturnValue(true);
          mockDelete.mockRejectedValue(mockUnauthorizedResponse);
          await expect(deleteAuth()).rejects.toThrow(
            mockUnauthorizedResponse.response.data.errors.join(", ")
          );
        });
      });

      describe("レスポンスデータの型がUnauthorizedResponseDataを満たさない場合", () => {
        it("適切なエラーメッセージがスローされる", async () => {
          mockAxios.isAxiosError.mockReturnValue(true);
          mockDelete.mockRejectedValue(mockUnexpectedResponse);
          await expect(deleteAuth()).rejects.toThrow(UNEXPECTED_ERROR_MESSAGE);
        });
      });
    });

    describe("エラーがAxios以外から発生した場合", () => {
      it("元のエラーがスローされる", async () => {
        const mockError = new Error("networkError");
        mockAxios.isAxiosError.mockReturnValue(false);
        mockDelete.mockRejectedValue(mockError);
        await expect(deleteAuth()).rejects.toThrow("networkError");
      });
    });
  });
});
