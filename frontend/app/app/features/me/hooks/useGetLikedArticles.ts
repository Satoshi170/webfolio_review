import { useSWRWithAxiosAndAuth } from "@/app/hooks/swr/useSWRWithAxiosAndAuth";

import type { GetMeLikedArticles } from "../types/getMeLikedArticles";

export const useGetLikedArticles = () => {
  const endpoint = "/me/liked_articles";
  const { responseData, ...other } = useSWRWithAxiosAndAuth<GetMeLikedArticles>(
    endpoint,
    {
      errorRetryCount: 2
    }
  );
  return { articlesData: responseData?.data, ...other };
};
