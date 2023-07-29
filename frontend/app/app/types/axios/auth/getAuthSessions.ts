import { AxiosResponse } from "axios";

import { UserData } from "../../auth";

export interface GetAuthSessionsSuccessData {
  isLogin: true;
  data: UserData;
}

export interface GetAuthSessionsErrorData {
  isLogin: false;
}

export type GetAuthSessionsData = GetAuthSessionsSuccessData | GetAuthSessionsErrorData;

export interface GetAuthSessionsSuccessResponse extends AxiosResponse {
  data: GetAuthSessionsSuccessData;
}

export interface GetAuthSessionsErrorResponse extends AxiosResponse {
  data: GetAuthSessionsErrorData;
}

export type GetAuthSessionsResponse =
  | GetAuthSessionsSuccessResponse
  | GetAuthSessionsErrorResponse;
