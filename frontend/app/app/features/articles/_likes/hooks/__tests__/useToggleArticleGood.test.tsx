import { act, renderHook, waitFor } from "@testing-library/react";

import { validUserData } from "@/__tests__/fixtures/auth/validUserData";
import { validPortfolioData } from "@/__tests__/fixtures/portfolio/validPortfolioData";
import { mockUseSetToastState } from "@/__tests__/mocks/hooks/recoil/toastState/mockUseSetToastState";
import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";

import { deleteArticleGood } from "../../api/deleteArticleGood";
import { postArticleGood } from "../../api/postArticleGood";
import { useToggleLikeArticleGood } from "../useToggleArticleGood";

jest.mock("@/app/hooks/recoil/loginState/useGetLoginState");
jest.mock("@/app/hooks/recoil/toastState/useSetToastState", () => mockUseSetToastState);
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

  const nonIncludeUserIdGoods = validPortfolioData.goods.filter(
    (item) => item.userId !== validUserData.id
  );
  const includeUserIdGoods = [...nonIncludeUserIdGoods, { userId: validUserData.id }];

  describe("initialLiked", () => {
    describe("isLoginがtrueの時", () => {
      beforeEach(() => {
        (useGetLoginState as jest.Mock).mockReturnValue({
          isLogin: true,
          userData: validUserData
        });
      });

      describe("userData.IdがPortfolioData.goodsのuserIdに存在する場合", () => {
        it("trueになる", () => {
          const { result } = renderHook(() =>
            useToggleLikeArticleGood({
              ...validPortfolioData,
              goods: includeUserIdGoods
            })
          );

          expect(result.current.isLiked).toBe(true);
        });
      });

      describe("userData.IdがPortfolioData.goodsのuserIdに存在しない場合", () => {
        it("falseになる", () => {
          const { result } = renderHook(() =>
            useToggleLikeArticleGood({
              ...validPortfolioData,
              goods: nonIncludeUserIdGoods
            })
          );

          expect(result.current.isLiked).toBe(false);
        });
      });
    });

    describe("isLoginがfalseの時", () => {
      beforeEach(() => {
        (useGetLoginState as jest.Mock).mockReturnValue({
          isLogin: false,
          userData: null
        });
      });

      it("falseになる", () => {
        const { result } = renderHook(() => useToggleLikeArticleGood(validPortfolioData));

        expect(result.current.isLiked).toBe(false);
      });
    });
  });

  describe("toggleLike", () => {
    const mockPostGood = postArticleGood as jest.Mock;
    const mockDeleteGood = deleteArticleGood as jest.Mock;

    describe("1000ms内にボタンが押された回数が奇数回の場合", () => {
      beforeEach(() => {
        (useGetLoginState as jest.Mock).mockReturnValue({
          isLogin: true,
          userData: validUserData
        });
      });

      describe("initialLikedがtrueの時", () => {
        it("mockDeleteGoodsが呼び出されエラーがなくその後奇数回押されるとmockPostGoodsが呼び出される", async () => {
          mockDeleteGood.mockResolvedValue(undefined);
          const { result } = renderHook(() =>
            useToggleLikeArticleGood({
              ...validPortfolioData,
              goods: includeUserIdGoods
            })
          );

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
          mockPostGood.mockResolvedValue(undefined);
          const { result } = renderHook(() =>
            useToggleLikeArticleGood({
              ...validPortfolioData,
              goods: nonIncludeUserIdGoods
            })
          );

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
        beforeEach(() => {
          (useGetLoginState as jest.Mock).mockReturnValue({
            isLogin: true,
            userData: validUserData
          });
        });

        it("mockDeleteGoodsもmockPostGoodsも呼び出されない", () => {
          const { result } = renderHook(() =>
            useToggleLikeArticleGood(validPortfolioData)
          );

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
