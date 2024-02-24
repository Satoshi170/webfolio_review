import { useSWRWithAxiosFetcher } from "@/app/hooks/swr/useSWRWithAxiosFetcher";

import type { GetArticleSuccessData } from "../types/api/getArticle";

export const useGetArticle = (id: number) => {
  const endPoint = `/articles/${id}`;
  const { responseData, ...other } = useSWRWithAxiosFetcher<GetArticleSuccessData>(
    endPoint,
    { errorRetryCount: 2 }
  );
  return { articleData: responseData?.data, ...other };
};
