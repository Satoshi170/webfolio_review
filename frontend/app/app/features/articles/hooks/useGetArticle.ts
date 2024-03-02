import { useSWRWithAxiosFetcher } from "@/app/hooks/swr/useSWRWithAxiosFetcher";

import type { ArticleData } from "../types/articleData";

export const useGetArticle = (id: number) => {
  const endPoint = `/articles/${id}`;
  const { responseData, ...other } = useSWRWithAxiosFetcher<ArticleData>(endPoint, {
    errorRetryCount: 2
  });
  return { articleData: responseData, ...other };
};
