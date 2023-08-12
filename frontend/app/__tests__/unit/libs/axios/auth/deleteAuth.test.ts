import { mockApi, mockAxios } from "@/__tests__/mocks/axios/api";
import { deleteAuth } from "@/app/libs/axios/auth/deleteAuth";
import { removeAuthInfo } from "@/app/libs/cookie/removeAuthInfo";
import {
  DeleteAuthErrorData,
  DeleteAuthSuccessData
} from "@/app/types/axios/auth/deleteAuth";

jest.mock("@/app/libs/cookie/removeAuthInfo");
jest.mock("@/app/libs/axios/api", () => mockApi);

describe("deleteAuth", () => {
  const successMessage = "Success message";
  const errorMessage = "Error message";
  const networkError = "Network error";

  const deleteAuthSuccessData: DeleteAuthSuccessData = {
    status: "success",
    messages: successMessage
  };

  const deleteAuthErrorData: DeleteAuthErrorData = {
    errors: [errorMessage]
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("リクエストに成功した時、removeAuthInfoが呼び出せれる", async () => {
    mockApi.delete.mockResolvedValue(deleteAuthSuccessData);
    await deleteAuth();
    expect(removeAuthInfo).toHaveBeenCalled();
  });

  it("リクエストが失敗し、エラーがAxiosから発生した場合、適切なエラーメッセージがスローされる", async () => {
    const mockErrorResponse = {
      response: { data: deleteAuthErrorData }
    };

    mockAxios.isAxiosError.mockReturnValue(true);
    mockApi.delete.mockRejectedValue(mockErrorResponse);
    await expect(deleteAuth()).rejects.toThrow(errorMessage);
  });

  it("リクエストが失敗し、エラーがAxios以外から発生した場合、元のエラーがスローされる", async () => {
    const mockError = new Error(networkError);
    mockAxios.isAxiosError.mockReturnValue(false);
    mockApi.delete.mockRejectedValue(mockError);
    await expect(deleteAuth()).rejects.toThrow(networkError);
  });
});