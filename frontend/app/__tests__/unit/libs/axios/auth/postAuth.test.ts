import { userData } from "@/__tests__/fixtures/auth/userData";
import { validSignUpData } from "@/__tests__/fixtures/auth/validSignUpData";
import { mockApi, mockAxios } from "@/__tests__/mocks/axios/api";
import { postAuth } from "@/app/libs/axios/auth/postAuth";
import { saveAuthInfoFromHeader } from "@/app/libs/cookie/saveAuthInfo";
import { PostAuthErrorData, PostAuthSuccessData } from "@/app/types/axios/auth/postAuth";

jest.mock("@/app/libs/cookie/saveAuthInfo");
jest.mock("@/app/libs/axios/api", () => mockApi);

describe("postAuth", () => {
  const errorMessage = "Error message";
  const networkError = "Network error";

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("リクエストに成功した時適切なレスポンスでsaveAuthInfoHeaderが呼び出される", async () => {
    const postAuthSuccessData: PostAuthSuccessData = {
      status: "success",
      data: userData
    };

    const mockResponse = {
      headers: {
        "access-token": "mockToken",
        client: "mockClient",
        uid: "mockUid"
      },
      data: postAuthSuccessData
    };

    mockApi.post.mockResolvedValue(mockResponse);
    await postAuth(validSignUpData);
    expect(saveAuthInfoFromHeader).toHaveBeenCalledWith(mockResponse);
  });

  it("リクエストが失敗し、エラーがAxiosから発生した場合、適切なエラーメッセージがスローされる", async () => {
    const postAuthErrorData: PostAuthErrorData = {
      status: "error",
      errors: { fullMessages: [errorMessage] }
    };

    const mockErrorResponse = {
      response: { data: postAuthErrorData }
    };

    mockAxios.isAxiosError.mockImplementation(() => true);
    mockApi.post.mockRejectedValue(mockErrorResponse);
    await expect(postAuth(validSignUpData)).rejects.toThrow(errorMessage);
  });

  it("リクエストが失敗し、エラーがAxios以外から発生した場合、元のエラーがスローされる", async () => {
    const mockError = new Error(networkError);
    mockAxios.isAxiosError.mockImplementation(() => false);
    mockApi.post.mockRejectedValue(mockError);
    await expect(postAuth(validSignUpData)).rejects.toThrow(networkError);
  });
});
