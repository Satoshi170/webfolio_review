import type { AxiosResponse } from "axios";

interface CustomHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

export type CustomAxiosResponse<T = unknown> = AxiosResponse<T> & {
  headers: AxiosResponse<T>["headers"] & CustomHeaders;
};
