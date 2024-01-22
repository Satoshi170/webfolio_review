import { AxiosError } from "axios";
import useSWR, { SWRConfiguration } from "swr";

import api from "@/app/libs/axios/api";

export const useSWRWithAxiosFetcher = <T>(
  endPoint: string,
  options?: SWRConfiguration
) => {
  const fetcher = async (endPoint: string) => {
    const response = await api.get<T>(endPoint);
    return response.data;
  };

  const { data, error, ...other } = useSWR<T, AxiosError>(endPoint, fetcher, options);
  return { responseData: data, error, ...other };
};
