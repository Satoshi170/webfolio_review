import { useSWRWithAxiosAndAuth } from "@/app/hooks/swr/useSWRWithAxiosAndAuth";

import type { CommentData } from "../../articles/_comments/types";
import type { ArticleData } from "../../articles/types/articleData";

interface MyComment extends Omit<CommentData, "user"> {
  article: Pick<ArticleData, "id" | "title">;
}

export const useGetMyComments = () => {
  const endpoint = "/me/comments";
  const { responseData, ...other } = useSWRWithAxiosAndAuth<MyComment[]>(endpoint, {
    errorRetryCount: 2
  });
  return { commentsData: responseData, ...other };
};
