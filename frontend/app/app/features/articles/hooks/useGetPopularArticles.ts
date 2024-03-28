import { useSWRWithAxiosFetcher } from "@/app/hooks/swr/useSWRWithAxiosFetcher";

import type { ArticleData } from "../types/articleData";

export const useGetPopularArticles = () => {
  const endpoint = "/popular_articles";
  const { responseData, ...other } = useSWRWithAxiosFetcher<ArticleData[]>(endpoint, {
    errorRetryCount: 2
  });
  return { popularArticlesData: responseData, ...other };
};
