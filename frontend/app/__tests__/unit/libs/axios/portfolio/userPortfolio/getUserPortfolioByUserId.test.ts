import { mockUnauthorizedResponse } from "@/__tests__/fixtures/auth/unauthorizedResponseData";
import { validPortfolioData } from "@/__tests__/fixtures/portfolio/validPortfolioData";
import { mockApi, mockAxios, mockGet } from "@/__tests__/mocks/axios/api";
import { getUserPortfoliosByUserId } from "@/app/libs/axios/portfolio/userPortfolio/getUserPortfoliosByUserId";
import { GetPortfoliosData } from "@/app/types/axios/portfolio/getPortfolios";

jest.mock("@/app/libs/axios/api", () => mockApi);

describe("getUserPortfoliosByUserId", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("リクエストに成功した時", () => {
    const mockGetUserPortfoliosByUserIdData: GetPortfoliosData = {
      status: "success",
      message: "success",
      data: [validPortfolioData]
    };

    const mockGetUserPortfoliosByUserIdResponse = {
      status: 200,
      data: mockGetUserPortfoliosByUserIdData
    };

    it("エラーをスローせずresponseの一部を返す", async () => {
      mockGet.mockResolvedValue(mockGetUserPortfoliosByUserIdResponse);
      await expect(getUserPortfoliosByUserId(1)).resolves.not.toThrow();
      expect(await getUserPortfoliosByUserId(1)).toEqual({
        status: 200,
        response: mockGetUserPortfoliosByUserIdData
      });
    });
  });

  describe("リクエストに失敗した時", () => {
    describe("エラーがAxiosから発生した場合", () => {
      it("エラーをスローせずresponseの一部を返す", async () => {
        mockAxios.isAxiosError.mockReturnValue(true);
        mockGet.mockRejectedValue(mockUnauthorizedResponse);
        await expect(getUserPortfoliosByUserId(1)).resolves.not.toThrow();
        expect(await getUserPortfoliosByUserId(1)).toEqual({
          status: mockUnauthorizedResponse.response.status,
          response: null
        });
      });
    });

    describe("エラーがaxios以外から発生した場合", () => {
      it("元のエラーがスローされる", async () => {
        const mockError = new Error("networkError");
        mockAxios.isAxiosError.mockReturnValue(false);
        mockGet.mockRejectedValue(mockError);
        await expect(getUserPortfoliosByUserId(1)).rejects.toThrow("networkError");
      });
    });
  });
});
