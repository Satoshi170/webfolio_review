import { act, renderHook } from "@testing-library/react";
import { RecoilRoot, RecoilState } from "recoil";

import { validPortfolioData } from "@/__tests__/fixtures/portfolio/validPortfolioData";
import { validPostPortfoliosData } from "@/__tests__/fixtures/portfolio/validPostPortfolioData";
import { mockReactHookForm } from "@/__tests__/mocks/reactHookForm/mockReactHookForm";
import {
  mockSetToast,
  mockUseSetRecoilState
} from "@/__tests__/mocks/recoil/mockUseSetRecoilState";
import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { usePatchPortfoliosByIdForm } from "@/app/hooks/forms/portfolio/usePatchPortfoliosByIdForm";
import { patchPortfoliosById } from "@/app/libs/axios/portfolio/patchPortfoliosById";

jest.mock("recoil", () => ({
  ...jest.requireActual<typeof import("recoil")>("recoil"),
  useSetRecoilState: (atom: RecoilState<unknown>) => mockUseSetRecoilState(atom)
}));

jest.mock("react-hook-form", () => mockReactHookForm);
jest.mock("@/app/libs/axios/portfolio/patchPortfoliosById");

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
        const { result } = renderHook(
          () => usePatchPortfoliosByIdForm(validPortfolioData),
          {
            wrapper: RecoilRoot
          }
        );
        await act(async () => {
          await result.current.onSubmit(validPostPortfoliosData);
        });
        expect(mockSetToast).toHaveBeenCalledWith(
          expect.objectContaining({ status: "success" })
        );
      });
    });

    describe("エラーが発生する時", () => {
      const errorMessage = "Error";
      describe("eがエラーオブジェクトである時", () => {
        it("適切なメッセージがセットされる", async () => {
          (patchPortfoliosById as jest.Mock).mockRejectedValue(new Error(errorMessage));
          const { result } = renderHook(
            () => usePatchPortfoliosByIdForm(validPortfolioData),
            {
              wrapper: RecoilRoot
            }
          );
          await act(async () => {
            await result.current.onSubmit(validPostPortfoliosData);
          });
          expect(mockSetToast).toHaveBeenCalledWith(
            expect.objectContaining({ message: errorMessage, status: "error" })
          );
        });
      });

      describe("eがエラーオブジェクトでない時", () => {
        it("適切なエラーメッセージがセットされる", async () => {
          (patchPortfoliosById as jest.Mock).mockRejectedValue(errorMessage);
          const { result } = renderHook(
            () => usePatchPortfoliosByIdForm(validPortfolioData),
            {
              wrapper: RecoilRoot
            }
          );
          await act(async () => {
            await result.current.onSubmit(validPostPortfoliosData);
          });
          expect(mockSetToast).toHaveBeenCalledWith(
            expect.objectContaining({
              message: UNEXPECTED_ERROR_MESSAGE,
              status: "error"
            })
          );
        });
      });
    });
  });
});
