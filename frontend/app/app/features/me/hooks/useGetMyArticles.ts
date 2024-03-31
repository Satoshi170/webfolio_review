import { useSWRWithAxiosAndAuth } from "@/app/hooks/swr/useSWRWithAxiosAndAuth";

import type { ArticleData } from "../../articles/types/articleData";

export const useGetMyArticles = () => {
  const endpoint = "/me/articles";
  const { responseData, ...other } = useSWRWithAxiosAndAuth<ArticleData[]>(endpoint, {
    errorRetryCount: 2
  });
  return { articlesData: responseData, ...other };
};
