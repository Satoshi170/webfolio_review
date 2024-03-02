import { useSWRWithAxiosFetcher } from "@/app/hooks/swr/useSWRWithAxiosFetcher";

import type { ArticleData } from "../types/articleData";

export const useGetLatestArticles = () => {
  const endpoint = "/latest_articles";
  const { responseData, ...other } = useSWRWithAxiosFetcher<ArticleData[] | []>(
    endpoint,
    {
      errorRetryCount: 2
    }
  );
  return { latestArticlesData: responseData, ...other };
};
