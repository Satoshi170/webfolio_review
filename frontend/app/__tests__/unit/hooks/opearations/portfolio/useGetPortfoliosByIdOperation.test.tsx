import { renderHook, waitFor } from "@testing-library/react";
import { RecoilRoot, RecoilState } from "recoil";

import { validPortfolioData } from "@/__tests__/fixtures/portfolio/validPortfolioData";
import {
  mockSetToast,
  mockUseSetRecoilState
} from "@/__tests__/mocks/recoil/mockUseSetRecoilState";
import { useGetPortfoliosByIdOperation } from "@/app/hooks/operations/portfolio/useGetPortfoliosByIdOperation";
import { getPortfoliosById } from "@/app/libs/axios/portfolio/getPortfoliosById";

jest.mock("recoil", () => ({
  ...jest.requireActual<typeof import("recoil")>("recoil"),
  useSetRecoilState: (atom: RecoilState<unknown>) => mockUseSetRecoilState(atom)
}));

jest.mock("@/app/libs/axios/portfolio/getPortfoliosById");
jest.mock("@/app/utils/getIdOrTriggerNotFound");

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
        const { result } = renderHook(() => useGetPortfoliosByIdOperation(1), {
          wrapper: RecoilRoot
        });
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
        const { result } = renderHook(() => useGetPortfoliosByIdOperation(1), {
          wrapper: RecoilRoot
        });
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
      renderHook(() => useGetPortfoliosByIdOperation(1), {
        wrapper: RecoilRoot
      });
      await waitFor(() => {
        expect(mockSetToast).toHaveBeenCalled();
      });
    });
  });
});
