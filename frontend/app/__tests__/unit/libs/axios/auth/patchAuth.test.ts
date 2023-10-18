import { mockApi, mockAxios, mockPatch } from "@/__tests__/mocks/axios/api";
import { mockAddAuthInfoToRequest } from "@/__tests__/mocks/cookie/mockLoadAuthInfo";
import { patchAuth } from "@/app/libs/axios/auth/patchAuth";
import { PatchAuthErrorData } from "@/app/types/axios/auth/patchAuth";

jest.mock("@/app/libs/cookie/loadAuthInfo", () => mockAddAuthInfoToRequest);
jest.mock("@/app/libs/axios/api", () => mockApi);

describe("patchAuth", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  const errorMessage = "Error message";
  const networkError = "Network error";

  const patchAuthErrorData: PatchAuthErrorData = {
    status: "error",
    errors: {
      fullMessages: [errorMessage]
    }
  };

  const params = {
    image: new File([""], "fileName"),
    otherParam: "value"
  };

  it("imageが含まれる場合、FormDataとしてパラメータが送信される", async () => {
    mockPatch.mockResolvedValue({});
    await patchAuth(params);

    expect(mockPatch).toHaveBeenCalled();
    const call = mockApi.patch.mock.calls[0];
    expect(call[0]).toBe("/auth");
    expect(call[1]).toBeInstanceOf(FormData);
    const formData = call[1] as FormData;
    expect(formData.get("image")).toEqual(params.image);
    expect(formData.get("otherParam")).toEqual(params.otherParam);
    expect(call[2]!.headers!["Content-Type"]).toBe("multipart/form-data");
  });

  it("imageが含まれない場合、FormDataとして送信されない", async () => {
    const nonImageParams = {
      name: "testuser"
    };

    mockPatch.mockResolvedValue({});
    await patchAuth(nonImageParams);

    expect(mockPatch).toHaveBeenCalled();
    const call = mockApi.patch.mock.calls[0];
    expect(call[0]).toBe("/auth");
    expect(call[1]).toBe(nonImageParams);
    expect(call[2]!.headers!["Content-Type"]).not.toBe("multipart/form-data");
  });

  it("リクエストが失敗し、エラーがAxiosから発生した場合、適切なエラーメッセージがスローされる", async () => {
    const mockErrorResponse = {
      response: { data: patchAuthErrorData }
    };

    mockAxios.isAxiosError.mockReturnValue(true);
    mockPatch.mockRejectedValue(mockErrorResponse);
    await expect(patchAuth(params)).rejects.toThrow(errorMessage);
  });

  it("リクエストが失敗し、エラーがAxios以外から発生した場合、元のエラーがスローされる", async () => {
    const mockError = new Error(networkError);
    mockAxios.isAxiosError.mockReturnValue(false);
    mockPatch.mockRejectedValue(mockError);
    await expect(patchAuth(params)).rejects.toThrow(networkError);
  });
});
