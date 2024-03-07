import { useEffect, useRef, useState } from "react";

import useDebouncedCallback from "beautiful-react-hooks/useDebouncedCallback";

import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";

import { useGetIsLiked } from "./useGetIsLiked";
import { deleteArticleGood } from "../api/deleteArticleGood";
import { postArticleGood } from "../api/postArticleGood";

import type { ArticleData } from "@/app/features/articles/types/articleData";

export const useToggleLikeArticleGood = (articleData: ArticleData) => {
  const { initialLiked, isLoading } = useGetIsLiked(articleData.id);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const isAlreadyLikedRef = useRef<boolean>(false);
  const clickCountRef = useRef<number>(0);

  useEffect(() => {
    if (initialLiked !== undefined) {
      setIsLiked(initialLiked);
      isAlreadyLikedRef.current = initialLiked;
    }
  }, [initialLiked]);

  const { setUnexpectedErrorToast } = useSetToastState();

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
    if (isLoading || initialLiked == undefined) return;

    setIsLiked(!isLiked);
    clickCountRef.current += 1;
    void debouncedToggle();
  };

  let totalLiked = articleData.goods.length;

  switch (initialLiked) {
    case true:
      totalLiked -= Number(!isLiked);
      break;
    case false:
      totalLiked += Number(isLiked);
      break;
  }

  return { isLiked, toggleLike, totalLiked };
};
