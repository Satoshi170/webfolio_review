import { act, renderHook } from "@testing-library/react";

import { validPostArticleData } from "@/__tests__/fixtures/articles/validPostArticleData";
import {
  mockSetErrorToast,
  mockSetSuccessToast,
  mockUseSetToastState
} from "@/__tests__/mocks/hooks/recoil/toastState/mockUseSetToastState";
import { mockNavigation } from "@/__tests__/mocks/mockNavigation";
import { mockReactHookForm } from "@/__tests__/mocks/reactHookForm/mockReactHookForm";

import { postArticle } from "../../api/postArticle";
import { useCreateArticleForm } from "../useCreateArticleForm";

jest.mock("react-hook-form", () => mockReactHookForm);
jest.mock("next/navigation", () => mockNavigation);
jest.mock("@/app/hooks/recoil/toastState/useSetToastState", () => mockUseSetToastState);
jest.mock("../../api/postArticle");

describe("useCreateArticleForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("onSubmit", () => {
    describe("エラーが発生しない時", () => {
      it("setSuccessToastが呼び出される", async () => {
        (postArticle as jest.Mock).mockResolvedValue(undefined);
        const { result } = renderHook(() => useCreateArticleForm());
        await act(async () => {
          await result.current.onSubmit(validPostArticleData);
        });
        expect(mockSetSuccessToast).toHaveBeenCalled();
      });
    });

    describe("エラーが発生する時", () => {
      const errorMessage = "Error";

      it("setErrorToastが呼び出される", async () => {
        (postArticle as jest.Mock).mockRejectedValue(new Error(errorMessage));
        const { result } = renderHook(() => useCreateArticleForm());
        await act(async () => {
          await result.current.onSubmit(validPostArticleData);
        });
        expect(mockSetErrorToast).toHaveBeenCalled();
      });
    });
  });
});
