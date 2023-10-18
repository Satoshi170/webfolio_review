import { renderHook, waitFor } from "@testing-library/react";
import { RecoilRoot, RecoilState } from "recoil";

import { validPortfolioData } from "@/__tests__/fixtures/portfolio/validPortfolioData";
import {
  mockSetToast,
  mockUseSetRecoilState
} from "@/__tests__/mocks/recoil/mockUseSetRecoilState";
import { useGetUserPortfoliosByUserIdOperation } from "@/app/hooks/operations/portfolio/userPortfolio/useGetUserPortfoliosByUserIdOperation";
import { getUserPortfoliosByUserId } from "@/app/libs/axios/portfolio/userPortfolio/getUserPortfoliosByUserId";
import { getIdOrTriggerNotFound } from "@/app/utils/getIdOrTriggerNotFound";

jest.mock("recoil", () => ({
  ...jest.requireActual<typeof import("recoil")>("recoil"),
  useSetRecoilState: (atom: RecoilState<unknown>) => mockUseSetRecoilState(atom)
}));

jest.mock("@/app/utils/getIdOrTriggerNotFound");
jest.mock("@/app/libs/axios/portfolio/userPortfolio/getUserPortfoliosByUserId");

describe("useGetUserPortfoliosByUserIdOperation", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  const testPathname = "/users/1/posts";
  (getIdOrTriggerNotFound as jest.Mock).mockReturnValue(1);

  describe("getUserPortfoliosByUserIdがエラーを返さない時", () => {
    describe("statusが200の時", () => {
      it("返却されるportfoliosDataは[validPortfolioData]である", async () => {
        const mockResponse = { data: [validPortfolioData] };
        (getUserPortfoliosByUserId as jest.Mock).mockResolvedValue({
          status: 200,
          response: mockResponse
        });
        const { result } = renderHook(
          () => useGetUserPortfoliosByUserIdOperation(testPathname),
          {
            wrapper: RecoilRoot
          }
        );
        await waitFor(() => {
          expect(result.current.status).toBe(200);
          expect(result.current.portfoliosData).toEqual([validPortfolioData]);
        });
      });
    });

    describe("statusが200でない時", () => {
      it("返却されるportfoliosDataは[]である", async () => {
        (getUserPortfoliosByUserId as jest.Mock).mockResolvedValue({
          status: 404,
          response: null
        });
        const { result } = renderHook(
          () => useGetUserPortfoliosByUserIdOperation(testPathname),
          {
            wrapper: RecoilRoot
          }
        );
        await waitFor(() => {
          expect(result.current.status).toBe(404);
          expect(result.current.portfoliosData).toEqual([]);
        });
      });
    });
  });

  describe("getUserPortfoliosByUserIdがエラーを返す時", () => {
    it("setToastが呼び出される", async () => {
      (getUserPortfoliosByUserId as jest.Mock).mockRejectedValue(new Error("Error"));
      renderHook(() => useGetUserPortfoliosByUserIdOperation(testPathname), {
        wrapper: RecoilRoot
      });
      await waitFor(() => {
        expect(mockSetToast).toHaveBeenCalled();
      });
    });
  });
});
