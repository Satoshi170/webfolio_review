import { useSWRWithAxiosFetcher } from "./useSWRWithAxiosFetcher";

import type { URLMetaData } from "@/app/types/axios/metaData";


export const useGetURLMetaData = (url: string) => {
  const URI = encodeURI(url);
  const endPointWithParams = `/meta_data?meta_data[url]=${URI}`;

  const { responseData, error, isLoading } = useSWRWithAxiosFetcher<URLMetaData>(
    endPointWithParams,
    { dedupingInterval: 86400000, errorRetryCount: 0 }
  );

  return { URLMetaData: responseData, error, isLoading };
};
