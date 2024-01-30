import { GetMeLikedPortfolios } from "@/app/types/axios/me/getMeLikedPortfolios";

import { useSWRWithAxiosAndAuth } from "../useSWRWithAxiosAndAuth";

export const useGetLikedPortfolios = () => {
  const endpoint = "/me/liked_portfolios";
  const { responseData, ...other } = useSWRWithAxiosAndAuth<GetMeLikedPortfolios>(
    endpoint,
    {
      errorRetryCount: 2
    }
  );
  return { portfoliosData: responseData?.data, ...other };
};
