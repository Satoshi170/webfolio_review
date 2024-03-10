import { useSWRWithAxiosFetcher } from "@/app/hooks/swr/useSWRWithAxiosFetcher";

import type { CommentTagData } from "../types";
import type { UserDataWithoutGoodsAndComments } from "@/app/types/auth";

interface Response {
  id: number;
  content: string;
  updatedAt: Date;
  tags: CommentTagData[];
  user: UserDataWithoutGoodsAndComments;
}

export const useGetComments = (articleId: number) => {
  const endpoint = `/articles/${articleId}/comments`;
  const { responseData, ...other } = useSWRWithAxiosFetcher<Response[] | []>(endpoint, {
    errorRetryCount: 2
  });
  return { commentsData: responseData, ...other };
};
