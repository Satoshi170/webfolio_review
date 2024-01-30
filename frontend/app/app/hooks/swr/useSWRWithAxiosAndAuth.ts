import { isAxiosError } from "axios";
import useSWR, { SWRConfiguration } from "swr";

import api from "@/app/libs/axios/api";
import addAuthInfoToRequest from "@/app/libs/cookie/loadAuthInfo";

import { useSetToastState } from "../recoil/toastState/useSetToastState";

export const useSWRWithAxiosAndAuth = <T>(
  endpoint: string,
  options?: SWRConfiguration
) => {
  const { setSeverErrorToast } = useSetToastState();
  const fetcher = async () => {
    const response = await api.get<T>(endpoint, addAuthInfoToRequest({}));
    return response.data;
  };

  const { data, error, ...other } = useSWR<T, unknown>(endpoint, fetcher, options);
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
