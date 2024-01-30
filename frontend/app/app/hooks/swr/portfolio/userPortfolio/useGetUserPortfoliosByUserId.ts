import { GetUserPortfoliosResponse } from "@/app/types/axios/portfolio/user_portfolio/getUserPortfolioByUserId";

import { useSWRWithAxiosFetcher } from "../../useSWRWithAxiosFetcher";

export const useGetUserPortfoliosByUserId = (userId: number) => {
  const endPoint = "/user_portfolios";
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
