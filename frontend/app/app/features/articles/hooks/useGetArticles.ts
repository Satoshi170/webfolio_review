import { useSWRWithAxiosFetcher } from "@/app/hooks/swr/useSWRWithAxiosFetcher";

import type { GetArticlesSuccessData } from "../types/api/getArticles";

export const useGetArticles = () => {
  const endpoint = "/articles";
  const { responseData, ...other } = useSWRWithAxiosFetcher<GetArticlesSuccessData>(
    endpoint,
    {
      errorRetryCount: 2
    }
  );
  return { articlesData: responseData?.data, ...other };
};
