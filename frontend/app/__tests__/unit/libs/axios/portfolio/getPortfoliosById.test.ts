import { mockUnauthorizedResponse } from "@/__tests__/fixtures/auth/unauthorizedResponseData";
import { validPortfolioData } from "@/__tests__/fixtures/portfolio/validPortfolioData";
import { mockApi, mockAxios, mockGet } from "@/__tests__/mocks/axios/api";
import { getPortfoliosById } from "@/app/libs/axios/portfolio/getPortfoliosById";
import { GetPortfoliosByIdSuccessData } from "@/app/types/axios/portfolio/getPortfoliosById";

jest.mock("@/app/libs/axios/api", () => mockApi);

describe("getPortfoliosById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("リクエストに成功した時", () => {
    const mockGetPortfoliosByIdData: GetPortfoliosByIdSuccessData = {
      status: "success",
      message: "success",
      data: validPortfolioData
    };

    const mockGetPortfoliosByIdResponse = {
      status: 200,
      data: mockGetPortfoliosByIdData
    };

    it("エラーをスローせずresponseの一部を返す", async () => {
      mockGet.mockResolvedValue(mockGetPortfoliosByIdResponse);
      await expect(getPortfoliosById(1)).resolves.not.toThrow();
      expect(await getPortfoliosById(1)).toEqual({
        status: 200,
        response: mockGetPortfoliosByIdData
      });
    });
  });

  describe("リクエストに失敗した時", () => {
    describe("エラーがAxiosから発生した場合", () => {
      it("エラーをスローせずresponseの一部を返す", async () => {
        mockAxios.isAxiosError.mockReturnValue(true);
        mockGet.mockRejectedValue(mockUnauthorizedResponse);
        await expect(getPortfoliosById(1)).resolves.not.toThrow();
        expect(await getPortfoliosById(1)).toEqual({
          status: mockUnauthorizedResponse.response.status,
          response: null
        });
      });
    });

    describe("エラーがAxios以外から発生した場合", () => {
      it("元のエラーがスローされる", async () => {
        const mockError = new Error("networkError");
        mockAxios.isAxiosError.mockReturnValue(false);
        mockGet.mockRejectedValue(mockError);
        await expect(getPortfoliosById(1)).rejects.toThrow("networkError");
      });
    });
  });
});
