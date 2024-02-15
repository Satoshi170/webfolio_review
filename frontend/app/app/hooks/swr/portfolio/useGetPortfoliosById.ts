import { useSWRWithAxiosFetcher } from "../useSWRWithAxiosFetcher";

import type { GetPortfoliosByIdSuccessData } from "@/app/types/axios/portfolio/getPortfoliosById";


export const useGetPortfoliosById = (id: number) => {
  const endPoint = `/portfolios/${id}`;
  const { responseData, ...other } = useSWRWithAxiosFetcher<GetPortfoliosByIdSuccessData>(
    endPoint,
    { errorRetryCount: 2 }
  );
  return { portfolioData: responseData?.data, ...other };
};
