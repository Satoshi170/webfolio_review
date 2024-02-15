import { useSWRWithAxiosFetcher } from "../../useSWRWithAxiosFetcher";

import type { GetPortfoliosResponse } from "@/app/types/axios/portfolio/getPortfolios";


export const useGetLatestPortfolios = () => {
  const endpoint = "/latest_portfolios";
  const { responseData, ...other } = useSWRWithAxiosFetcher<GetPortfoliosResponse>(
    endpoint,
    {
      errorRetryCount: 2
    }
  );
  return { latestPortfoliosData: responseData?.data, ...other };
};
