import { AxiosResponse } from "axios";

interface CustomHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

export type CustomAxiosResponse<T = any> = AxiosResponse<T> & {
  headers: AxiosResponse<T>["headers"] & CustomHeaders;
};
