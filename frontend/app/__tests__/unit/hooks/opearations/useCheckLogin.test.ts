import { act, renderHook } from "@testing-library/react";
import * as recoil from "recoil";

import { useCheckLogin } from "@/app/hooks/useCheckLogin";
import { getAuthSessions } from "@/app/libs/axios/auth/getAuthSessions";
import {
  GetAuthSessionsFalseData,
  GetAuthSessionsTrueData
} from "@/app/types/axios/auth/getAuthSessions";

jest.mock("@/app/libs/axios/auth/getAuthSessions");
const mockSetLogin = jest.fn();
jest.spyOn(recoil, "useSetRecoilState").mockReturnValue(mockSetLogin);

describe("useCheckLogin", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("エラーが発生しない時", () => {
    describe("isLoginがtrueの時", () => {
      it("imageがnullではない時、適切なログイン状態を設定する", async () => {
        const mockData: GetAuthSessionsTrueData = {
          isLogin: true,
          data: { name: "testuser", image: "testImage" }
        };
        (getAuthSessions as jest.Mock).mockResolvedValue(mockData);
        const { result } = renderHook(() => useCheckLogin());
        await act(() => result.current());
        expect(mockSetLogin).toHaveBeenCalledWith(mockData);
      });

      it("imageがnullの時imageにdefaultUserImageが設定される", async () => {
        const mockData = {
          isLogin: true,
          data: { name: "testuser", image: null }
        };
        const defaultUserImage = "/defaultUserImage.png";

        (getAuthSessions as jest.Mock).mockResolvedValue(mockData);
        const { result } = renderHook(() => useCheckLogin());
        await act(() => result.current());
        expect(mockSetLogin).toHaveBeenCalledWith({
          ...mockData,
          data: { ...mockData.data, image: defaultUserImage }
        });
      });
    });

    describe("isLoginがfalseの時", () => {
      it("dataはnullと設定される", async () => {
        const mockData: GetAuthSessionsFalseData = { isLogin: false };
        (getAuthSessions as jest.Mock).mockResolvedValue(mockData);
        const { result } = renderHook(() => useCheckLogin());
        await act(() => result.current());
        expect(mockSetLogin).toHaveBeenCalledWith({ ...mockData, data: null });
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
        expect(mockSetLogin).toHaveBeenCalledWith({ isLogin: false, data: null });
      });
    });
  });
});
