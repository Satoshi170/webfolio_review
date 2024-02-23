import { useSWRWithAxiosFetcher } from "../../useSWRWithAxiosFetcher";

import type { GetUserPortfoliosResponse } from "@/app/types/axios/portfolio/user_portfolio/getUserPortfolioByUserId";

export const useGetUserPortfoliosByUserId = (userId: number) => {
  const endPoint = "/user_articles";
  const params = { userId };
  const { responseData, ...other } = useSWRWithAxiosFetcher<GetUserPortfoliosResponse>(
    [endPoint, params],
    {
      errorRetryCount: 2
    }
  );
  return {
    portfoliosData: responseData?.data.portfolios,
    userData: responseData?.data.user,
    ...other
  };
};
