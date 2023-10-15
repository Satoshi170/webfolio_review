import { act, renderHook } from "@testing-library/react";
import { RecoilRoot, RecoilState } from "recoil";

import { validSignInData } from "@/__tests__/fixtures/auth/validSignInData";
import { mockNavigation, replaceMock } from "@/__tests__/mocks/mockNavigation";
import {
  mockReactHookForm,
  mockSetError
} from "@/__tests__/mocks/reactHookForm/mockReactHookForm";
import {
  mockSetToast,
  mockUseSetRecoilState
} from "@/__tests__/mocks/recoil/mockUseSetRecoilState";
import { useSignInForm } from "@/app/hooks/forms/auth/useSignInForm";
import { useCheckLogin } from "@/app/hooks/useCheckLogin";
import { postAuthSignIn } from "@/app/libs/axios/auth/postAuthSignIn";

jest.mock("recoil", () => ({
  ...jest.requireActual<typeof import("recoil")>("recoil"),
  useSetRecoilState: (atom: RecoilState<unknown>) => mockUseSetRecoilState(atom)
}));
jest.mock("next/navigation", () => mockNavigation);
jest.mock("react-hook-form", () => mockReactHookForm);
jest.mock("@/app/hooks/useCheckLogin");
jest.mock("@/app/libs/axios/auth/postAuthSignIn");

describe("useSignInForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("エラーが発生しない時", () => {
    it("setErrorは呼び出されない", async () => {
      (postAuthSignIn as jest.Mock).mockResolvedValue(undefined);
      (useCheckLogin as jest.Mock).mockReturnValue(() => Promise.resolve());
      const { result } = renderHook(() => useSignInForm(), { wrapper: RecoilRoot });
      await act(async () => {
        await result.current.onSubmit(validSignInData);
      });
      expect(replaceMock).toHaveBeenCalled();
      expect(mockSetToast).toHaveBeenCalled();
      expect(mockSetError).not.toHaveBeenCalled();
    });
  });

  describe("エラーが発生する時", () => {
    const specificErrorMessage = "Invalid login credentials. Please try again.";
    const nonSpecificErrorMessage = "Error";

    describe("エラーメッセージがInvalid login credentials. Please try again.の時", () => {
      it("setToastが呼び出される", async () => {
        (postAuthSignIn as jest.Mock).mockRejectedValue(new Error(specificErrorMessage));
        (useCheckLogin as jest.Mock).mockReturnValue(() => Promise.reject());
        const { result } = renderHook(() => useSignInForm(), { wrapper: RecoilRoot });
        await act(async () => {
          await result.current.onSubmit(validSignInData);
        });
        expect(replaceMock).not.toHaveBeenCalled();
        expect(mockSetToast).not.toHaveBeenCalled();
        expect(mockSetError).toHaveBeenCalled();
      });
    });

    describe("エラーメッセージがInvalid login credentials. Please try again.でない時", () => {
      it("setErrorは呼び出されない", async () => {
        (postAuthSignIn as jest.Mock).mockRejectedValue(
          new Error(nonSpecificErrorMessage)
        );
        (useCheckLogin as jest.Mock).mockReturnValue(() => Promise.reject());
        const { result } = renderHook(() => useSignInForm(), { wrapper: RecoilRoot });
        await act(async () => {
          await result.current.onSubmit(validSignInData);
        });
        expect(replaceMock).not.toHaveBeenCalled();
        expect(mockSetToast).toHaveBeenCalledWith({
          message: nonSpecificErrorMessage,
          status: "error",
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          timestamp: expect.any(Number)
        });
        expect(mockSetError).not.toHaveBeenCalled();
      });
    });
  });
});
