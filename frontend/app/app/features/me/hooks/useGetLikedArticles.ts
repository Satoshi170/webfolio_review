import { useSWRWithAxiosAndAuth } from "@/app/hooks/swr/useSWRWithAxiosAndAuth";

import type { ArticleData } from "../../articles/types/articleData";

export const useGetLikedArticles = () => {
  const endpoint = "/me/liked_articles";
  const { responseData, ...other } = useSWRWithAxiosAndAuth<ArticleData[] | []>(
    endpoint,
    {
      errorRetryCount: 2
    }
  );
  return { articlesData: responseData, ...other };
};
