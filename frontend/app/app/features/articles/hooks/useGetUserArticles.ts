import { useSWRWithAxiosFetcher } from "@/app/hooks/swr/useSWRWithAxiosFetcher";

import type { GetUserArticlesResponseData } from "../types/api/getUserArticles";

export const useGetUserArticles = (userId: number) => {
  const endPoint = "/user_articles";
  const params = { userId };
  const { responseData, ...other } = useSWRWithAxiosFetcher<GetUserArticlesResponseData>(
    [endPoint, params],
    {
      errorRetryCount: 2
    }
  );
  return {
    articlesData: responseData?.articles,
    userData: responseData?.user,
    ...other
  };
};
