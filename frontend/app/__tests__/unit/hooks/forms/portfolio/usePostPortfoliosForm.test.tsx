import { act, renderHook } from "@testing-library/react";

import { validPostPortfoliosData } from "@/__tests__/fixtures/portfolio/validPostPortfolioData";
import {
  mockSetErrorToast,
  mockSetSuccessToast,
  mockUseSetToastState
} from "@/__tests__/mocks/hooks/recoil/toastState/mockUseSetToastState";
import { mockReactHookForm } from "@/__tests__/mocks/reactHookForm/mockReactHookForm";
import { usePostPortfoliosForm } from "@/app/hooks/forms/portfolio/usePostPortfoliosForm";
import { postPortfolios } from "@/app/libs/axios/portfolio/postPortfolios";

jest.mock("react-hook-form", () => mockReactHookForm);
jest.mock("@/app/libs/axios/portfolio/postPortfolios");
jest.mock("@/app/hooks/recoil/toastState/useSetToastState", () => mockUseSetToastState);

describe("usePostPortfoliosForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("onSubmit", () => {
    describe("エラーが発生しない時", () => {
      it("setSuccessToastが呼び出される", async () => {
        (postPortfolios as jest.Mock).mockResolvedValue(undefined);
        const { result } = renderHook(() => usePostPortfoliosForm());
        await act(async () => {
          await result.current.onSubmit(validPostPortfoliosData);
        });
        expect(mockSetSuccessToast).toHaveBeenCalled();
      });
    });

    describe("エラーが発生する時", () => {
      const errorMessage = "Error";

      it("setErrorToastが呼び出される", async () => {
        (postPortfolios as jest.Mock).mockRejectedValue(new Error(errorMessage));
        const { result } = renderHook(() => usePostPortfoliosForm());
        await act(async () => {
          await result.current.onSubmit(validPostPortfoliosData);
        });
        expect(mockSetErrorToast).toHaveBeenCalled();
      });
    });
  });
});
