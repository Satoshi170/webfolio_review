import { validSignInData } from "@/__tests__/fixtures/auth/validSignInData";
import { mockUnexpectedResponse } from "@/__tests__/fixtures/unexpectedResponseData";
import { mockApi, mockAxios, mockPost } from "@/__tests__/mocks/axios/api";
import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { postAuthSignIn } from "@/app/libs/axios/auth/postAuthSignIn";
import { saveAuthInfoFromHeader } from "@/app/libs/cookie/saveAuthInfo";

import type {
  PostAuthSignInErrorData,
  PostAuthSignInSuccessData
} from "@/app/types/axios/auth/postAuthSignIn";

jest.mock("@/app/libs/cookie/saveAuthInfo");
jest.mock("@/app/libs/axios/api", () => mockApi);

describe("postAuthSignIn", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("リクエストに成功した時", () => {
    const mockPostAuthSignInSuccessData: PostAuthSignInSuccessData = {
      success: true,
      message: "success"
    };

    const mockPostAuthSignInSuccessResponse = {
      headers: {
        "access-token": "mockToken",
        client: "mockClient",
        uid: "mockUid"
      },
      data: mockPostAuthSignInSuccessData
    };

    it("エラーをスローせず,saveAuthInfoHeaderが呼び出される", async () => {
      mockPost.mockResolvedValue(mockPostAuthSignInSuccessResponse);
      await expect(postAuthSignIn(validSignInData)).resolves.not.toThrow();
      await postAuthSignIn(validSignInData);
      expect(saveAuthInfoFromHeader).toHaveBeenCalledWith(
        mockPostAuthSignInSuccessResponse
      );
    });
  });
  describe("リクエストに失敗した時", () => {
    describe("エラーがAxiosから発生した場合", () => {
      describe("レスポンスの型がPostAuthSignInErrorDataを満たす場合", () => {
        it("適切なエラーメッセージがスローされる", async () => {
          const errorMessage = "Error message";
          const mockPostAuthSignInErrorData: PostAuthSignInErrorData = {
            success: false,
            errors: [errorMessage]
          };

          const mockPostAuthSignInErrorResponse = {
            response: { data: mockPostAuthSignInErrorData }
          };

          mockAxios.isAxiosError.mockReturnValue(true);
          mockPost.mockRejectedValue(mockPostAuthSignInErrorResponse);
          await expect(postAuthSignIn(validSignInData)).rejects.toThrow(errorMessage);
        });
      });
      describe("レスポンスの型がPostAuthSignInErrorDataを満たさない場合", () => {
        it("適切なエラーがスローされる", async () => {
          mockAxios.isAxiosError.mockReturnValue(true);
          mockPost.mockRejectedValue(mockUnexpectedResponse);
          await expect(postAuthSignIn(validSignInData)).rejects.toThrow(
            UNEXPECTED_ERROR_MESSAGE
          );
        });
      });
    });

    describe("エラーがAxios以外から発生した場合", () => {
      it("元のエラーがスローされる", async () => {
        const networkError = "Network error";
        const mockError = new Error(networkError);
        mockAxios.isAxiosError.mockReturnValue(false);
        mockPost.mockRejectedValue(mockError);
        await expect(postAuthSignIn(validSignInData)).rejects.toThrow(networkError);
      });
    });
  });
});
