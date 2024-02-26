import { mockUnexpectedResponse } from "@/__tests__/fixtures/unexpectedResponseData";
import { mockApi, mockAxios, mockDelete } from "@/__tests__/mocks/axios/api";
import { mockAddAuthInfoToRequest } from "@/__tests__/mocks/cookie/mockLoadAuthInfo";
import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { removeAuthInfo } from "@/app/libs/cookie/removeAuthInfo";

import { deleteAuthSignOut } from "../deleteAuthSignOut";

import type {
  DeleteAuthSignOutFailedData,
  DeleteAuthSignOutSuccessData
} from "@/app/types/axios/auth/deleteAuthSignOut";

jest.mock("@/app/libs/cookie/removeAuthInfo");
jest.mock("@/app/libs/cookie/loadAuthInfo", () => mockAddAuthInfoToRequest);
jest.mock("@/app/libs/axios/api", () => mockApi);

describe("deleteAuthSignOut", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("リクエストに成功した時", () => {
    const mockDeleteAuthSignOutSuccessData: DeleteAuthSignOutSuccessData = {
      success: true
    };

    const mockDeleteAuthSignOutSuccessResponse = {
      data: mockDeleteAuthSignOutSuccessData
    };

    it("エラーをスローせずremoveAuthInfoが呼び出せれる", async () => {
      mockDelete.mockResolvedValue(mockDeleteAuthSignOutSuccessResponse);
      await expect(deleteAuthSignOut()).resolves.not.toThrow();
      await deleteAuthSignOut();
      expect(removeAuthInfo).toHaveBeenCalled();
    });
  });

  describe("リクエストに失敗した時", () => {
    describe("エラーがAxiosから発生した場合", () => {
      beforeEach(() => {
        mockAxios.isAxiosError.mockReturnValue(true);
      });

      describe("レスポンスデータの型がDeleteAuthSignOutFailedDataを満たす場合", () => {
        const mockDeleteAuthSignOutFailedData: DeleteAuthSignOutFailedData = {
          status: "error",
          errors: ["errorMessage"]
        };

        const mockDeleteAuthSignOutFailedResponse = {
          response: { data: mockDeleteAuthSignOutFailedData }
        };

        it("適切なエラーメッセージがスローされる", async () => {
          mockDelete.mockRejectedValue(mockDeleteAuthSignOutFailedResponse);
          await expect(deleteAuthSignOut()).rejects.toThrow(
            mockDeleteAuthSignOutFailedData.errors.join(", ")
          );
        });
      });

      describe("レスポンスデータの型がDeleteAuthSignOutFailedDataを満たさない場合", () => {
        it("適切なエラーメッセージがスローされる", async () => {
          mockDelete.mockRejectedValue(mockUnexpectedResponse);
          await expect(deleteAuthSignOut()).rejects.toThrow(UNEXPECTED_ERROR_MESSAGE);
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
        await expect(deleteAuthSignOut()).rejects.toThrow("networkError");
      });
    });
  });
});
