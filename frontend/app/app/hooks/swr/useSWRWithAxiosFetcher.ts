import { isAxiosError } from "axios";
import useSWR, { SWRConfiguration } from "swr";

import api from "@/app/libs/axios/api";

import { useSetToastState } from "../recoil/toastState/useSetToastState";

type Endpoint = string;
type EndpointWithParamsArray = [Endpoint, unknown];
type EndpointOrArray = Endpoint | EndpointWithParamsArray;

export const useSWRWithAxiosFetcher = <T>(
  EndpointOrArray: EndpointOrArray,
  options?: SWRConfiguration
) => {
  const { setSeverErrorToast } = useSetToastState();

  const fetcher = async (EndpointOrArray: EndpointOrArray) => {
    const isArray = Array.isArray(EndpointOrArray);
    const endpoint = isArray ? EndpointOrArray[0] : EndpointOrArray;
    const params = isArray ? EndpointOrArray[1] : undefined;

    const response = params
      ? await api.get<T>(endpoint, { params })
      : await api.get<T>(endpoint);

    return response.data;
  };

  const { data, error, ...other } = useSWR<T, unknown>(EndpointOrArray, fetcher, options);
  let errorStatus: number | null = null;

  if (error) {
    if (isAxiosError(error)) {
      errorStatus = error.response?.status ?? null;
      if (!errorStatus) {
        setSeverErrorToast();
      }
    } else {
      setSeverErrorToast();
    }
  }

  return { responseData: data, error, errorStatus, ...other };
};
