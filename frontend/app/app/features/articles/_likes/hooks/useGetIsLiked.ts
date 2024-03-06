import { useSWRWithAxiosAndAuth } from "@/app/hooks/swr/useSWRWithAxiosAndAuth";

interface Response {
  isLiked: boolean;
}
export const useGetIsLiked = (articleId: number) => {
  const endpoint = `/articles/${articleId}/goods/check`;
  const { responseData, ...other } = useSWRWithAxiosAndAuth<Response>(endpoint, {
    errorRetryCount: 2
  });
  return { initialLiked: responseData?.isLiked, ...other };
};
