import { useSWRWithAxiosFetcher } from "@/app/hooks/swr/useSWRWithAxiosFetcher";

import type { GetArticlesSuccessData } from "../types/api/getArticles";

export const useGetLatestArticles = () => {
  const endpoint = "/latest_articles";
  const { responseData, ...other } = useSWRWithAxiosFetcher<GetArticlesSuccessData>(
    endpoint,
    {
      errorRetryCount: 2
    }
  );
  return { latestArticlesData: responseData?.data, ...other };
};
