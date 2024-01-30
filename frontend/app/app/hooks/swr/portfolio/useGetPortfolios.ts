import { GetPortfoliosResponse } from "@/app/types/axios/portfolio/getPortfolios";

import { useSWRWithAxiosFetcher } from "../useSWRWithAxiosFetcher";

export const useGetPortfolios = () => {
  const endpoint = "/portfolios";
  const { responseData, ...other } = useSWRWithAxiosFetcher<GetPortfoliosResponse>(
    endpoint,
    {
      errorRetryCount: 2
    }
  );
  return { portfoliosData: responseData?.data, ...other };
};
