import { renderHook, waitFor } from "@testing-library/react";

import { validPortfolioData } from "@/__tests__/fixtures/portfolio/validPortfolioData";
import {
  mockSetUnexpectedErrorToast,
  mockUseSetToastState
} from "@/__tests__/mocks/hooks/recoil/toastState/mockUseSetToastState";
import { useGetPortfoliosByIdOperation } from "@/app/hooks/operations/portfolio/useGetPortfoliosByIdOperation";
import { getPortfoliosById } from "@/app/libs/axios/portfolio/getPortfoliosById";

jest.mock("@/app/libs/axios/portfolio/getPortfoliosById");
jest.mock("@/app/utils/getIdOrTriggerNotFound");
jest.mock("@/app/hooks/recoil/toastState/useSetToastState", () => mockUseSetToastState);

describe("useGetPortfoliosByIdOperation", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("getPortfoliosByIdがエラーを返さない時", () => {
    describe("statusが200の時", () => {
      it("返却されるportfolioDataはvalidPortfolioDataである", async () => {
        const mockResponse = { data: validPortfolioData };
        (getPortfoliosById as jest.Mock).mockResolvedValue({
          status: 200,
          response: mockResponse
        });
        const { result } = renderHook(() => useGetPortfoliosByIdOperation(1));
        await waitFor(() => {
          expect(result.current.status).toBe(200);
          expect(result.current.portfolioData).toEqual(validPortfolioData);
        });
      });
    });

    describe("statusが200でない時", () => {
      it("返却されるportfolioDataはnullである", async () => {
        (getPortfoliosById as jest.Mock).mockResolvedValue({
          status: 404,
          response: null
        });
        const { result } = renderHook(() => useGetPortfoliosByIdOperation(1));
        await waitFor(() => {
          expect(result.current.status).toBe(404);
          expect(result.current.portfolioData).toBeNull();
        });
      });
    });
  });

  describe("getPortfoliosByIdがエラーを返す時", () => {
    it("setToastが呼び出される", async () => {
      (getPortfoliosById as jest.Mock).mockRejectedValue(new Error("Error"));
      renderHook(() => useGetPortfoliosByIdOperation(1));
      await waitFor(() => {
        expect(mockSetUnexpectedErrorToast).toHaveBeenCalled();
      });
    });
  });
});
