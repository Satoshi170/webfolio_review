import { useSWRWithAxiosFetcher } from "@/app/hooks/swr/useSWRWithAxiosFetcher";

import type { ArticleData } from "../types/articleData";

export const useGetArticles = () => {
  const endpoint = "/articles";
  const { responseData, ...other } = useSWRWithAxiosFetcher<ArticleData[] | []>(
    endpoint,
    {
      errorRetryCount: 2
    }
  );
  return { articlesData: responseData, ...other };
};
