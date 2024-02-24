import { useSWRWithAxiosFetcher } from "@/app/hooks/swr/useSWRWithAxiosFetcher";

import type { GetUserArticlesSuccessData } from "../types/api/getUserArticles";

export const useGetUserArticles = (userId: number) => {
  const endPoint = "/user_articles";
  const params = { userId };
  const { responseData, ...other } = useSWRWithAxiosFetcher<GetUserArticlesSuccessData>(
    [endPoint, params],
    {
      errorRetryCount: 2
    }
  );
  return {
    articlesData: responseData?.data.articles,
    userData: responseData?.data.user,
    ...other
  };
};
