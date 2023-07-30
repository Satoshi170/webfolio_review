import { userData } from "@/__tests__/fixtures/auth/userData";
import { validSignInData } from "@/__tests__/fixtures/auth/validSignInData";
import { mockApi, mockAxios } from "@/__tests__/mocks/axios/api";
import { postAuthSignIn } from "@/app/libs/axios/auth/postAuthSignIn";
import { saveAuthInfoFromHeader } from "@/app/libs/cookie/saveAuthInfo";
import {
  PostAuthSignInErrorData,
  PostAuthSignInSuccessData
} from "@/app/types/axios/auth/postAuthSignIn";

jest.mock("@/app/libs/cookie/saveAuthInfo");
jest.mock("@/app/libs/axios/api", () => mockApi);

describe("postAuth", () => {
  const errorMessage = "Error message";
  const networkError = "Network error";

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("リクエストに成功した時適切なレスポンスでsaveAuthInfoHeaderが呼び出される", async () => {
    const PostAuthSignInSuccessData: PostAuthSignInSuccessData = {
      data: userData
    };

    const mockSuccessResponse = {
      headers: {
        "access-token": "mockToken",
        client: "mockClient",
        uid: "mockUid"
      },
      data: PostAuthSignInSuccessData
    };

    mockApi.post.mockResolvedValue(mockSuccessResponse);
    await postAuthSignIn(validSignInData);
    expect(saveAuthInfoFromHeader).toHaveBeenCalledWith(mockSuccessResponse);
  });

  it("リクエストが失敗し、エラーがAxiosから発生した場合、適切なエラーメッセージがスローされる", async () => {
    const PostAuthSignInErrorData: PostAuthSignInErrorData = {
      success: false,
      errors: [errorMessage]
    };
    const mockErrorResponse = {
      response: { data: PostAuthSignInErrorData }
    };

    mockAxios.isAxiosError.mockImplementation(() => true);
    mockApi.post.mockRejectedValue(mockErrorResponse);
    await expect(postAuthSignIn(validSignInData)).rejects.toThrow(errorMessage);
  });

  it("リクエストが失敗し、エラーがAxios以外から発生した場合、元のエラーがスローされる", async () => {
    const mockError = new Error(networkError);
    mockAxios.isAxiosError.mockImplementation(() => false);
    mockApi.post.mockRejectedValue(mockError);
    await expect(postAuthSignIn(validSignInData)).rejects.toThrow(networkError);
  });
});
