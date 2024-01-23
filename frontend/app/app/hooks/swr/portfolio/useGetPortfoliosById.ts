import { GetPortfoliosByIdSuccessData } from "@/app/types/axios/portfolio/getPortfoliosById";

import { useSWRWithAxiosFetcher } from "../useSWRWithAxiosFetcher";

export const useGetPortfoliosById = (id: number) => {
  const endPoint = `/portfolios/${id}`;
  const { responseData, ...other } = useSWRWithAxiosFetcher<GetPortfoliosByIdSuccessData>(
    endPoint,
    { errorRetryCount: 2 }
  );
  return { portfolioData: responseData?.data, ...other };
};
