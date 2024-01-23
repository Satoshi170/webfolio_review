import { isAxiosError } from "axios";
import useSWR, { SWRConfiguration } from "swr";

import api from "@/app/libs/axios/api";

import { useSetToastState } from "../recoil/toastState/useSetToastState";

export const useSWRWithAxiosFetcher = <T>(
  endPoint: string,
  options?: SWRConfiguration
) => {
  const { setSeverErrorToast } = useSetToastState();
  const fetcher = async (endPoint: string) => {
    const response = await api.get<T>(endPoint);
    return response.data;
  };

  const { data, error, ...other } = useSWR<T, unknown>(endPoint, fetcher, options);
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
