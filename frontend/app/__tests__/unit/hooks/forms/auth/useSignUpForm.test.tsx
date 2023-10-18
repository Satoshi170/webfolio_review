import { act, renderHook } from "@testing-library/react";
import { RecoilRoot, RecoilState } from "recoil";

import { validSignUpData } from "@/__tests__/fixtures/auth/validSignUpData";
import { mockNavigation, replaceMock } from "@/__tests__/mocks/mockNavigation";
import {
  mockReactHookForm,
  mockSetError
} from "@/__tests__/mocks/reactHookForm/mockReactHookForm";
import {
  mockSetToast,
  mockUseSetRecoilState
} from "@/__tests__/mocks/recoil/mockUseSetRecoilState";
import { useSignUpForm } from "@/app/hooks/forms/auth/useSignUpForm";
import { useCheckLogin } from "@/app/hooks/useCheckLogin";
import { postAuth } from "@/app/libs/axios/auth/postAuth";

jest.mock("recoil", () => ({
  ...jest.requireActual<typeof import("recoil")>("recoil"),
  useSetRecoilState: (atom: RecoilState<unknown>) => mockUseSetRecoilState(atom)
}));
jest.mock("next/navigation", () => mockNavigation);
jest.mock("react-hook-form", () => mockReactHookForm);
jest.mock("@/app/hooks/useCheckLogin");
jest.mock("@/app/libs/axios/auth/postAuth");

describe("useSignUpForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("エラーが発生しない時", () => {
    it("setErrorは呼び出されない", async () => {
      (postAuth as jest.Mock).mockResolvedValue(undefined);
      (useCheckLogin as jest.Mock).mockReturnValue(() => Promise.resolve());
      const { result } = renderHook(() => useSignUpForm(), { wrapper: RecoilRoot });
      await act(async () => {
        await result.current.onSubmit(validSignUpData);
      });
      expect(replaceMock).toHaveBeenCalled();
      expect(mockSetToast).toHaveBeenCalled();
      expect(mockSetError).not.toHaveBeenCalled();
    });
  });

  describe("エラーが発生する時", () => {
    const specificErrorMessage = "Email has already been taken";
    const nonSpecificErrorMessage = "Error";

    describe("エラーメッセージがEmail has already been takenの時", () => {
      it("setToastは呼び出されない", async () => {
        (postAuth as jest.Mock).mockRejectedValue(new Error(specificErrorMessage));
        (useCheckLogin as jest.Mock).mockReturnValue(() => Promise.reject());
        const { result } = renderHook(() => useSignUpForm(), { wrapper: RecoilRoot });
        await act(async () => {
          await result.current.onSubmit(validSignUpData);
        });
        expect(replaceMock).not.toHaveBeenCalled();
        expect(mockSetToast).not.toHaveBeenCalled();
        expect(mockSetError).toHaveBeenCalled();
      });
    });

    describe("エラーメッセージがEmail has already been takenでない時", () => {
      it("setErrorは呼び出されない", async () => {
        (postAuth as jest.Mock).mockRejectedValue(new Error(nonSpecificErrorMessage));
        (useCheckLogin as jest.Mock).mockReturnValue(() => Promise.reject());
        const { result } = renderHook(() => useSignUpForm(), { wrapper: RecoilRoot });
        await act(async () => {
          await result.current.onSubmit(validSignUpData);
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
