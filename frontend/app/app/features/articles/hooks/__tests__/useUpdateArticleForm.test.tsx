import { act, renderHook } from "@testing-library/react";

import { validArticleData } from "@/__tests__/fixtures/articles/validArticleData";
import { validPostArticleData } from "@/__tests__/fixtures/articles/validPostArticleData";
import {
  mockSetErrorToast,
  mockSetSuccessToast,
  mockUseSetToastState
} from "@/__tests__/mocks/hooks/recoil/toastState/mockUseSetToastState";
import { mockReactHookForm } from "@/__tests__/mocks/reactHookForm/mockReactHookForm";

import { patchArticle } from "../../api/patchArticle";
import { useUpdateArticleForm } from "../useUpdateArticleForm";

jest.mock("react-hook-form", () => mockReactHookForm);
jest.mock("@/app/hooks/recoil/toastState/useSetToastState", () => mockUseSetToastState);
jest.mock("@/app/hooks/useEditMode", () => ({
  useEditMode: () => ({
    setIsEditMode: jest.fn()
  })
}));

jest.mock("../useGetArticle", () => ({
  useGetArticle: () => ({
    mutate: jest.fn()
  })
}));

jest.mock("../../api/patchArticle");

describe("useUpdateArticleForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("onSubmit", () => {
    describe("エラーが発生しない時", () => {
      it("セットされるトーストのstatusはsuccessである", async () => {
        (patchArticle as jest.Mock).mockResolvedValue(undefined);
        const { result } = renderHook(() => useUpdateArticleForm(validArticleData));
        await act(async () => {
          await result.current.onSubmit(validPostArticleData);
        });
        expect(mockSetSuccessToast).toHaveBeenCalled();
      });
    });

    describe("エラーが発生する時", () => {
      const errorMessage = "Error";

      it("適切なメッセージがセットされる", async () => {
        (patchArticle as jest.Mock).mockRejectedValue(new Error(errorMessage));
        const { result } = renderHook(() => useUpdateArticleForm(validArticleData));
        await act(async () => {
          await result.current.onSubmit(validPostArticleData);
        });
        expect(mockSetErrorToast).toHaveBeenCalled();
      });
    });
  });
});
