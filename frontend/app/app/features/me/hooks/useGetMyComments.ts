import { useSWRWithAxiosAndAuth } from "@/app/hooks/swr/useSWRWithAxiosAndAuth";

import type { CommentTagData } from "../../articles/_comments/types";

interface Comment {
  id: number;
  content: string;
  updatedAt: Date;
  tags: CommentTagData[];
  article: {
    id: number;
    title: string;
  };
}

export const useGetMyComments = () => {
  const endpoint = "/me/comments";
  const { responseData, ...other } = useSWRWithAxiosAndAuth<Comment[] | []>(endpoint, {
    errorRetryCount: 2
  });
  return { commentsData: responseData, ...other };
};
