import useSWR from "swr";

import api from "@/app/libs/axios/api";
import { URLMetaData } from "@/app/types/axios/metaData";

export const useGetURLMetaData = (url: string) => {
  const URI = encodeURI(url);
  const endPointWithParams = `/meta_data?meta_data[url]=${URI}`;

  const fetcher = async (endPoint: string) => {
    const response = await api.get<URLMetaData>(endPoint);
    return response.data;
  };

  const { data, error, isLoading } = useSWR<URLMetaData, Error>(
    endPointWithParams,
    fetcher,
    { dedupingInterval: 86400000, errorRetryCount: 0 }
  );

  return { data, error, isLoading };
};
