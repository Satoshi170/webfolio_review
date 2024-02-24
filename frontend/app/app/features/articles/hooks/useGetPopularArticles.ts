import { useSWRWithAxiosFetcher } from "@/app/hooks/swr/useSWRWithAxiosFetcher";

import type { GetArticlesSuccessData } from "../types/api/getArticles";

export const useGetPopularArticles = () => {
  const endpoint = "/popular_articles";
  const { responseData, ...other } = useSWRWithAxiosFetcher<GetArticlesSuccessData>(
    endpoint,
    {
      errorRetryCount: 2
    }
  );
  return { popularArticlesData: responseData?.data, ...other };
};
