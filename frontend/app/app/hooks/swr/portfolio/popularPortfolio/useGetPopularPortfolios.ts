import { useSWRWithAxiosFetcher } from "../../useSWRWithAxiosFetcher";

import type { GetPortfoliosResponse } from "@/app/types/axios/portfolio/getPortfolios";

export const useGetPopularPortfolios = () => {
  const endpoint = "/popular_portfolios";
  const { responseData, ...other } = useSWRWithAxiosFetcher<GetPortfoliosResponse>(
    endpoint,
    {
      errorRetryCount: 2
    }
  );
  return { popularPortfoliosData: responseData?.data, ...other };
};
