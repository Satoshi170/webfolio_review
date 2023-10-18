import { validUserData } from "@/__tests__/fixtures/auth/validUserData";
import { mockApi, mockAxios, mockGet } from "@/__tests__/mocks/axios/api";
import { mockAddAuthInfoToRequest } from "@/__tests__/mocks/cookie/mockLoadAuthInfo";
import { getAuthSessions } from "@/app/libs/axios/auth/getAuthSessions";
import { GetAuthSessionsData } from "@/app/types/axios/auth/getAuthSessions";

jest.mock("@/app/libs/cookie/loadAuthInfo", () => mockAddAuthInfoToRequest);
jest.mock("@/app/libs/axios/api", () => mockApi);

describe("getAuthSessions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  const errorMessage = "Error message";
  const networkError = "Network error";

  const getAuthTrueSessionsData: GetAuthSessionsData = {
    isLogin: true,
    data: validUserData
  };

  it("リクエストに成功した時、適切なデータが返される", async () => {
    mockGet.mockResolvedValue({ data: getAuthTrueSessionsData });
    const result = await getAuthSessions();
    expect(result).toEqual(getAuthTrueSessionsData);
  });

  it("リクエストが失敗し、エラーがAxiosから発生した場合、適切なエラーメッセージがスローされる", async () => {
    mockGet.mockRejectedValue(new Error(errorMessage));
    mockAxios.isAxiosError.mockReturnValue(true);
    await expect(getAuthSessions()).rejects.toThrow(errorMessage);
  });

  it("リクエストが失敗し、エラーがAxios以外から発生した場合、元のエラーがスローされる", async () => {
    mockAxios.isAxiosError.mockReturnValue(false);
    mockGet.mockRejectedValue(new Error(networkError));
    await expect(getAuthSessions()).rejects.toThrow(networkError);
  });
});
