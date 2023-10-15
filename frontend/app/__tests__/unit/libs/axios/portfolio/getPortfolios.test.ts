import { mockUnauthorizedResponse } from "@/__tests__/fixtures/auth/unauthorizedResponseData";
import { validPortfolioData } from "@/__tests__/fixtures/portfolio/validPortfolioData";
import { mockApi, mockAxios, mockGet } from "@/__tests__/mocks/axios/api";
import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { getPortfolios } from "@/app/libs/axios/portfolio/getPortfolios";
import { GetPortfoliosData } from "@/app/types/axios/portfolio/getPortfolios";

jest.mock("@/app/libs/axios/api", () => mockApi);

describe("getPortfolios", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("リクエストに成功した時", () => {
    const mockGetPortfoliosData: GetPortfoliosData = {
      status: "success",
      message: "success",
      data: [validPortfolioData]
    };

    const mockGetPortfoliosResponse = {
      data: mockGetPortfoliosData
    };

    it("エラーをスローせずdataを返す", async () => {
      mockGet.mockResolvedValue(mockGetPortfoliosResponse);
      await expect(getPortfolios()).resolves.not.toThrow();
      expect(await getPortfolios()).toEqual(mockGetPortfoliosData);
    });
  });

  describe("リクエストに失敗した時", () => {
    describe("エラーがAxiosから発生した場合", () => {
      it("適切なエラーがスローされる", async () => {
        mockAxios.isAxiosError.mockReturnValue(true);
        mockGet.mockRejectedValue(mockUnauthorizedResponse);
        await expect(getPortfolios()).rejects.toThrow(UNEXPECTED_ERROR_MESSAGE);
      });
    });

    describe("エラーがAxios以外から発生した場合", () => {
      it("元のエラーがスローされる", async () => {
        const mockError = new Error("networkError");
        mockAxios.isAxiosError.mockReturnValue(false);
        mockGet.mockRejectedValue(mockError);
        await expect(getPortfolios()).rejects.toThrow("networkError");
      });
    });
  });
});
