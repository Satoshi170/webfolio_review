import { userData } from "@/__tests__/fixtures/auth/userData";
import { mockApi, mockAxios } from "@/__tests__/mocks/axios/api";
import { getAuthSessions } from "@/app/libs/axios/auth/getAuthSessions";
import { GetAuthSessionsData } from "@/app/types/axios/auth/getAuthSessions";

jest.mock("@/app/libs/cookie/loadAuthInfo");
jest.mock("@/app/libs/axios/api", () => mockApi);

describe("getAuthSessions", () => {
  const errorMessage = "Error message";
  const networkError = "Network error";

  const getAuthTrueSessionsData: GetAuthSessionsData = {
    isLogin: true,
    data: userData
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("リクエストに成功した時、適切なデータが返される", async () => {
    mockApi.get.mockResolvedValue({ data: getAuthTrueSessionsData });
    const result = await getAuthSessions();
    expect(result).toEqual(getAuthTrueSessionsData);
  });

  it("リクエストが失敗し、エラーがAxiosから発生した場合、適切なエラーメッセージがスローされる", async () => {
    mockAxios.isAxiosError.mockReturnValue(true);
    mockApi.get.mockRejectedValue(new Error(errorMessage));
    await expect(getAuthSessions()).rejects.toThrow(errorMessage);
  });

  it("リクエストが失敗し、エラーがAxios以外から発生した場合、元のエラーがスローされる", async () => {
    mockAxios.isAxiosError.mockReturnValue(false);
    mockApi.get.mockRejectedValue(new Error(networkError));
    await expect(getAuthSessions()).rejects.toThrow(networkError);
  });
});
