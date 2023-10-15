import { UnauthorizedResponseData } from "../../auth";

export interface DeleteAuthSuccessData {
  status: "success";
  messages: string;
}

export type DeleteAuthErrorData = UnauthorizedResponseData;

export type DeleteAuthData = DeleteAuthSuccessData | DeleteAuthErrorData;
