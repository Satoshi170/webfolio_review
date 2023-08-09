export interface DeleteAuthSuccessData {
  status: "success";
  messages: string;
}

export interface DeleteAuthErrorData {
  errors: string[];
}

export type DeleteAuthData = DeleteAuthSuccessData | DeleteAuthErrorData;
