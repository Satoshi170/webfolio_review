import { AxiosResponse } from "axios";

export interface CustomAxiosResponse extends AxiosResponse {
  headers: {
    [header: string]: string;
    "access-token": string;
    client: string;
    uid: string;
  };
}
