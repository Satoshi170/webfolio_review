import { useSWRWithAxiosFetcher } from "@/app/hooks/swr/useSWRWithAxiosFetcher";

import type { CommentData } from "../types";

export const useGetComments = (articleId: number) => {
  const endpoint = `/articles/${articleId}/comments`;
  const { responseData, ...other } = useSWRWithAxiosFetcher<CommentData[] | []>(
    endpoint,
    {
      errorRetryCount: 2
    }
  );
  return { commentsData: responseData, ...other };
};
