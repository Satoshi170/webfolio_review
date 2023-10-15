import { renderHook, waitFor } from "@testing-library/react";
import { RecoilRoot, RecoilState } from "recoil";

import { validPortfolioData } from "@/__tests__/fixtures/portfolio/validPortfolioData";
import { mockNavigation, mockNotFound } from "@/__tests__/mocks/mockNavigation";
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

jest.mock("next/navigation", () => mockNavigation);
jest.mock("@/app/libs/axios/portfolio/getPortfoliosById");

describe("useGetPortfoliosByIdOperation", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("pathname", () => {
    describe("pathnameに/post/が含まれている場合", () => {
      describe("その後の文字が数字である場合", () => {
        const testPathname = "/post/1";
        describe("getPortfoliosByIdがエラーを返す時", () => {
          it("notFoundが呼び出される", async () => {
            (getPortfoliosById as jest.Mock).mockRejectedValue(new Error("Error"));
            renderHook(() => useGetPortfoliosByIdOperation(testPathname), {
              wrapper: RecoilRoot
            });
            await waitFor(() => {
              expect(mockSetToast).toHaveBeenCalled();
            });
          });
        });

        describe("getPortfoliosByIdがエラーを返さない時", () => {
          describe("statusが200の時", () => {
            const mockResponse = { data: validPortfolioData };
            it("返却されるportfolioDataはvalidPortfolioDataである", async () => {
              (getPortfoliosById as jest.Mock).mockResolvedValue({
                status: 200,
                response: mockResponse
              });
              const { result } = renderHook(
                () => useGetPortfoliosByIdOperation(testPathname),
                {
                  wrapper: RecoilRoot
                }
              );
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
              const { result } = renderHook(
                () => useGetPortfoliosByIdOperation(testPathname),
                {
                  wrapper: RecoilRoot
                }
              );
              await waitFor(() => {
                expect(result.current.status).toBe(404);
                expect(result.current.portfolioData).toBeNull();
              });
            });
          });
        });
      });

      describe("その後の文字が数字でない場合", () => {
        it("notFoundが呼び出される", () => {
          renderHook(() => useGetPortfoliosByIdOperation("/post/test"), {
            wrapper: RecoilRoot
          });
          expect(mockNotFound).toHaveBeenCalled();
        });
      });
    });

    describe("pathnameに/post/が含まれていない場合", () => {
      it("notFoundが呼び出される", () => {
        renderHook(() => useGetPortfoliosByIdOperation("/test/1"), {
          wrapper: RecoilRoot
        });
        expect(mockNotFound).toHaveBeenCalled();
      });
    });
  });
});
