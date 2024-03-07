import { act, renderHook, waitFor } from "@testing-library/react";

import { validArticleData } from "@/__tests__/fixtures/articles/validArticleData";
import { mockUseSetToastState } from "@/__tests__/mocks/hooks/recoil/toastState/mockUseSetToastState";

import { deleteArticleGood } from "../../api/deleteArticleGood";
import { postArticleGood } from "../../api/postArticleGood";
import { useGetIsLiked } from "../useGetIsLiked";
import { useToggleLikeArticleGood } from "../useToggleArticleGood";

jest.mock("@/app/hooks/recoil/toastState/useSetToastState", () => mockUseSetToastState);
jest.mock("../useGetIsLiked");
jest.mock("../../api/deleteArticleGood");
jest.mock("../../api/postArticleGood");
jest.useFakeTimers();

describe("useToggleLikeArticleGood", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  describe("toggleLike", () => {
    const mockPostGood = postArticleGood as jest.Mock;
    const mockDeleteGood = deleteArticleGood as jest.Mock;
    const mockUseGetIsLiked = useGetIsLiked as jest.Mock;

    describe("1000ms内にボタンが押された回数が奇数回の場合", () => {
      describe("initialLikedがtrueの時", () => {
        it("mockDeleteGoodsが呼び出されエラーがなくその後奇数回押されるとmockPostGoodsが呼び出される", async () => {
          mockUseGetIsLiked.mockReturnValue({ initialLiked: true, isLoading: false });
          mockDeleteGood.mockResolvedValue(undefined);
          const { result } = renderHook(() => useToggleLikeArticleGood(validArticleData));

          expect(result.current.isLiked).toBe(true);

          act(() => {
            result.current.toggleLike();
            jest.advanceTimersByTime(1500);
          });

          await waitFor(() => {
            expect(mockPostGood).toHaveBeenCalledTimes(0);
            expect(mockDeleteGood).toHaveBeenCalledTimes(1);
          });

          act(() => {
            result.current.toggleLike();
            jest.advanceTimersByTime(1500);
          });

          await waitFor(() => {
            expect(mockPostGood).toHaveBeenCalledTimes(1);
            expect(mockDeleteGood).toHaveBeenCalledTimes(1);
          });
        });
      });

      describe("initialLikedがfalseの時", () => {
        it("mockPostGoodsが呼び出されエラーがなくその後奇数回押されるとmockDeleteGoodsが呼び出される", async () => {
          mockUseGetIsLiked.mockReturnValue({ initialLiked: false, isLoading: false });
          mockPostGood.mockResolvedValue(undefined);
          const { result } = renderHook(() => useToggleLikeArticleGood(validArticleData));

          expect(result.current.isLiked).toBe(false);

          act(() => {
            result.current.toggleLike();
            jest.advanceTimersByTime(1500);
          });

          await waitFor(() => {
            expect(mockPostGood).toHaveBeenCalledTimes(1);
            expect(mockDeleteGood).toHaveBeenCalledTimes(0);
          });

          act(() => {
            result.current.toggleLike();
            jest.advanceTimersByTime(1500);
          });

          await waitFor(() => {
            expect(mockPostGood).toHaveBeenCalledTimes(1);
            expect(mockDeleteGood).toHaveBeenCalledTimes(1);
          });
        });
      });

      describe("1000ms以内に押された回数が偶数回の時", () => {
        it("mockDeleteGoodsもmockPostGoodsも呼び出されない", () => {
          mockUseGetIsLiked.mockReturnValue({ initialLiked: true, isLoading: false });
          const { result } = renderHook(() => useToggleLikeArticleGood(validArticleData));

          expect(result.current.isLiked).toBe(true);

          act(() => {
            result.current.toggleLike();
            jest.advanceTimersByTime(500);
            result.current.toggleLike();
            jest.advanceTimersByTime(1000);
          });

          expect(mockPostGood).not.toHaveBeenCalled();
          expect(mockDeleteGood).not.toHaveBeenCalled();
        });
      });
    });
  });
});
