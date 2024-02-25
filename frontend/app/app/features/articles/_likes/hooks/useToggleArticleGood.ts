import { useRef, useState } from "react";

import useDebouncedCallback from "beautiful-react-hooks/useDebouncedCallback";

import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";
import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";

import { deleteArticleGood } from "../api/deleteArticleGood";
import { postArticleGood } from "../api/postArticleGood";

import type { ArticleData } from "@/app/features/articles/types/articleData";

export const useToggleLikeArticleGood = (articleData: ArticleData) => {
  const { isLogin, userData } = useGetLoginState();
  const { setUnexpectedErrorToast } = useSetToastState();

  const initialLiked = isLogin
    ? articleData.goods.some((good) => good.userId === userData.id)
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
          await deleteArticleGood(articleData.id);
        } else {
          await postArticleGood(articleData.id);
        }
        isAlreadyLikedRef.current = !isAlreadyLikedRef.current;
      } catch (e) {
        setUnexpectedErrorToast();
      } finally {
        clickCountRef.current = 0;
      }
    },
    [setUnexpectedErrorToast, articleData],
    1000
  );

  const toggleLike = () => {
    setIsLiked(!isLiked);
    clickCountRef.current += 1;
    void debouncedToggle();
  };

  let totalLiked: number;
  if (initialLiked) {
    totalLiked = articleData.goods.length - Number(!isLiked);
  } else {
    totalLiked = articleData.goods.length + Number(isLiked);
  }

  return { isLiked, toggleLike, totalLiked };
};
