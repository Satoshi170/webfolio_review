import { mockApi, mockAxios } from "@/__tests__/mocks/axios/api";
import { DeleteAuthSignOut } from "@/app/libs/axios/auth/deleteAuthSignOut";
import { removeAuthInfo } from "@/app/libs/cookie/removeAuthInfo";
import {
  DeleteAuthSignOutErrorData,
  DeleteAuthSignOutSuccessData
} from "@/app/types/axios/auth/deleteAuthSignOut";

jest.mock("@/app/libs/cookie/removeAuthInfo");
jest.mock("@/app/libs/axios/api", () => mockApi);

describe("deleteAuthSignOut", () => {
  const errorMessage = "Error message";
  const networkError = "Network error";

  const deleteAuthSignOutSuccessData: DeleteAuthSignOutSuccessData = {
    success: true
  };

  const deleteAuthSignOutErrorData: DeleteAuthSignOutErrorData = {
    success: false,
    errors: [errorMessage]
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("リクエストに成功した時、removeAuthInfoが呼び出せれる", async () => {
    const mockSuccessResponse = {
      response: { data: deleteAuthSignOutSuccessData }
    };
    mockApi.delete.mockResolvedValue(mockSuccessResponse);
    await DeleteAuthSignOut();
    expect(removeAuthInfo).toHaveBeenCalled();
  });

  it("リクエストが失敗し、エラーがAxiosから発生した場合、適切なエラーメッセージがスローされる", async () => {
    const mockErrorResponse = {
      response: { data: deleteAuthSignOutErrorData }
    };

    mockAxios.isAxiosError.mockReturnValue(true);
    mockApi.delete.mockRejectedValue(mockErrorResponse);
    await expect(DeleteAuthSignOut()).rejects.toThrow(errorMessage);
  });

  it("リクエストが失敗し、エラーがAxios以外から発生した場合、元のエラーがスローされる", async () => {
    const mockError = new Error(networkError);
    mockAxios.isAxiosError.mockReturnValue(false);
    mockApi.delete.mockRejectedValue(mockError);
    await expect(DeleteAuthSignOut()).rejects.toThrow(networkError);
  });
});
