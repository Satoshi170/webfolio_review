import { useSWRWithAxiosAndAuth } from "../useSWRWithAxiosAndAuth";

import type { GetMeLikedPortfolios } from "@/app/types/axios/me/getMeLikedPortfolios";

export const useGetLikedPortfolios = () => {
  const endpoint = "/me/liked_articles";
  const { responseData, ...other } = useSWRWithAxiosAndAuth<GetMeLikedPortfolios>(
    endpoint,
    {
      errorRetryCount: 2
    }
  );
  return { portfoliosData: responseData?.data, ...other };
};
