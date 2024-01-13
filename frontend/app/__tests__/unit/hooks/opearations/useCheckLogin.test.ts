import { act, renderHook } from "@testing-library/react";

import { validUserData } from "@/__tests__/fixtures/auth/validUserData";
import {
  mockSetLoginState,
  mockUseSetLoginState
} from "@/__tests__/mocks/hooks/recoil/loginState/mockUseSetLoginState";
import { useCheckLogin } from "@/app/hooks/useCheckLogin";
import { getAuthSessions } from "@/app/libs/axios/auth/getAuthSessions";
import {
  GetAuthSessionsFalseData,
  GetAuthSessionsTrueData
} from "@/app/types/axios/auth/getAuthSessions";

jest.mock("@/app/libs/axios/auth/getAuthSessions");
jest.mock("@/app/hooks/recoil/loginState/useSetLoginState", () => mockUseSetLoginState);

describe("useCheckLogin", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("エラーが発生しない時", () => {
    describe("isLoginがtrueの時", () => {
      it("imageがnullではない時、適切なログイン状態を設定する", async () => {
        const mockData: GetAuthSessionsTrueData = {
          isLogin: true,
          data: validUserData
        };
        (getAuthSessions as jest.Mock).mockResolvedValue(mockData);
        const { result } = renderHook(() => useCheckLogin());
        await act(() => result.current());
        expect(mockSetLoginState).toHaveBeenCalledWith({
          isLogin: mockData.isLogin,
          userData: mockData.data
        });
      });

      it("imageがnullの時imageにdefaultUserImageが設定される", async () => {
        const mockData = {
          isLogin: true,
          data: { ...validUserData, image: null }
        };
        const defaultUserImage = "/defaultUserImage.png";

        (getAuthSessions as jest.Mock).mockResolvedValue(mockData);
        const { result } = renderHook(() => useCheckLogin());
        await act(() => result.current());
        expect(mockSetLoginState).toHaveBeenCalledWith({
          isLogin: mockData.isLogin,
          userData: { ...mockData.data, image: defaultUserImage }
        });
      });
    });

    describe("isLoginがfalseの時", () => {
      it("userDataはnullと設定される", async () => {
        const mockData: GetAuthSessionsFalseData = { isLogin: false };
        (getAuthSessions as jest.Mock).mockResolvedValue(mockData);
        const { result } = renderHook(() => useCheckLogin());
        await act(() => result.current());
        expect(mockSetLoginState).toHaveBeenCalledWith({ ...mockData, userData: null });
      });
    });

    describe("エラーが発生する時", () => {
      it("isLoginがfalseの時と同じ挙動をする", async () => {
        const errorMessage = "Error";
        (getAuthSessions as jest.Mock).mockRejectedValue(new Error(errorMessage));
        const { result } = renderHook(() => useCheckLogin());
        await act(async () => {
          await result.current();
        });
        expect(mockSetLoginState).toHaveBeenCalledWith({
          isLogin: false,
          userData: null
        });
      });
    });
  });
});
