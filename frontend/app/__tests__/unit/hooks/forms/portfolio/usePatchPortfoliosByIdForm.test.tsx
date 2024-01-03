import { act, renderHook } from "@testing-library/react";

import { validPortfolioData } from "@/__tests__/fixtures/portfolio/validPortfolioData";
import { validPostPortfoliosData } from "@/__tests__/fixtures/portfolio/validPostPortfolioData";
import {
  mockSetErrorToast,
  mockSetSuccessToast,
  mockUseSetToastState
} from "@/__tests__/mocks/hooks/recoil/toastState/mockUseSetToastState";
import { mockReactHookForm } from "@/__tests__/mocks/reactHookForm/mockReactHookForm";
import { usePatchPortfoliosByIdForm } from "@/app/hooks/forms/portfolio/usePatchPortfoliosByIdForm";
import { patchPortfoliosById } from "@/app/libs/axios/portfolio/patchPortfoliosById";

jest.mock("react-hook-form", () => mockReactHookForm);
jest.mock("@/app/libs/axios/portfolio/patchPortfoliosById");
jest.mock("@/app/hooks/recoil/toastState/useSetToastState", () => mockUseSetToastState);

describe("usePatchPortfoliosByIdForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("onSubmit", () => {
    describe("エラーが発生しない時", () => {
      it("セットされるトーストのstatusはsuccessである", async () => {
        (patchPortfoliosById as jest.Mock).mockResolvedValue(undefined);
        const { result } = renderHook(() =>
          usePatchPortfoliosByIdForm(validPortfolioData)
        );
        await act(async () => {
          await result.current.onSubmit(validPostPortfoliosData);
        });
        expect(mockSetSuccessToast).toHaveBeenCalled();
      });
    });

    describe("エラーが発生する時", () => {
      const errorMessage = "Error";

      it("適切なメッセージがセットされる", async () => {
        (patchPortfoliosById as jest.Mock).mockRejectedValue(new Error(errorMessage));
        const { result } = renderHook(() =>
          usePatchPortfoliosByIdForm(validPortfolioData)
        );
        await act(async () => {
          await result.current.onSubmit(validPostPortfoliosData);
        });
        expect(mockSetErrorToast).toHaveBeenCalled();
      });
    });
  });
});
