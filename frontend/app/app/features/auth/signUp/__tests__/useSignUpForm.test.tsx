import { act, renderHook } from "@testing-library/react";

import { validSignUpData } from "@/__tests__/fixtures/auth/validSignUpData";
import {
  mockSetErrorToast,
  mockSetSuccessToast,
  mockUseSetToastState
} from "@/__tests__/mocks/hooks/recoil/toastState/mockUseSetToastState";
import { mockNavigation, replaceMock } from "@/__tests__/mocks/mockNavigation";
import {
  mockReactHookForm,
  mockSetError
} from "@/__tests__/mocks/reactHookForm/mockReactHookForm";
import { postAuth } from "@/app/libs/axios/auth/postAuth";

import { useCheckLogin } from "../../userSession/useCheckLogin";
import { useSignUpForm } from "../useSignUpForm";

jest.mock("@/app/hooks/recoil/toastState/useSetToastState", () => mockUseSetToastState);
jest.mock("next/navigation", () => mockNavigation);
jest.mock("react-hook-form", () => mockReactHookForm);
jest.mock("@/app/libs/axios/auth/postAuth");
jest.mock("../../userSession/useCheckLogin");

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
      const { result } = renderHook(() => useSignUpForm());
      await act(async () => {
        await result.current.onSubmit(validSignUpData);
      });
      expect(replaceMock).toHaveBeenCalled();
      expect(mockSetSuccessToast).toHaveBeenCalled();
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
        const { result } = renderHook(() => useSignUpForm());
        await act(async () => {
          await result.current.onSubmit(validSignUpData);
        });
        expect(replaceMock).not.toHaveBeenCalled();
        expect(mockSetErrorToast).not.toHaveBeenCalled();
        expect(mockSetError).toHaveBeenCalled();
      });
    });

    describe("エラーメッセージがEmail has already been takenでない時", () => {
      it("setErrorは呼び出されない", async () => {
        (postAuth as jest.Mock).mockRejectedValue(new Error(nonSpecificErrorMessage));
        (useCheckLogin as jest.Mock).mockReturnValue(() => Promise.reject());
        const { result } = renderHook(() => useSignUpForm());
        await act(async () => {
          await result.current.onSubmit(validSignUpData);
        });
        expect(replaceMock).not.toHaveBeenCalled();
        expect(mockSetErrorToast).toHaveBeenCalledWith(nonSpecificErrorMessage);
        expect(mockSetError).not.toHaveBeenCalled();
      });
    });
  });
});
