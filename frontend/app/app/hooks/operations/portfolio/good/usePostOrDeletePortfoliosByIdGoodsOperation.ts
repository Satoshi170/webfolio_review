import useDebouncedCallback from "beautiful-react-hooks/useDebouncedCallback";
import { useRef, useState } from "react";

import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";
import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { deletePortfoliosByIdGoods } from "@/app/libs/axios/portfolio/good/deletePortfoliosByIdGoods";
import { postPortfoliosByIdGoods } from "@/app/libs/axios/portfolio/good/postPortfoliosByIdGoods";

import type { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

export const usePostOrDeletePortfoliosByIdGoodsOperation = (
  portfolioData: PortfolioData
) => {
  const { isLogin, userData } = useGetLoginState();
  const { setUnexpectedErrorToast } = useSetToastState();

  const initialLiked = isLogin
    ? portfolioData.goods.some((good) => good.userId === userData.id)
    : false;

  const [isLiked, setIsLiked] = useState(initialLiked);
  const isAlreadyLikedRef = useRef(initialLiked);
  const clickCountRef = useRef(0);

  const debouncedToggle = useDebouncedCallback(
    async () => {
      const currentClickCount = clickCountRef.current;
      if (currentClickCount % 2 === 0) {
        clickCountRef.current = 0;
        return;
      }

      try {
        if (isAlreadyLikedRef.current) {
          await deletePortfoliosByIdGoods(portfolioData.id);
        } else {
          await postPortfoliosByIdGoods(portfolioData.id);
        }
        isAlreadyLikedRef.current = !isAlreadyLikedRef.current;
      } catch (e) {
        setUnexpectedErrorToast();
      } finally {
        clickCountRef.current = 0;
      }
    },
    [setUnexpectedErrorToast, portfolioData],
    1000
  );

  const toggleLike = () => {
    setIsLiked(!isLiked);
    clickCountRef.current += 1;
    void debouncedToggle();
  };

  let totalLiked: number;
  if (initialLiked) {
    totalLiked = portfolioData.goods.length - Number(!isLiked);
  } else {
    totalLiked = portfolioData.goods.length + Number(isLiked);
  }

  return { isLiked, toggleLike, totalLiked };
};
