export interface DeleteAuthSignOutSuccessData {
  success: true;
}

export interface DeleteAuthSignOutErrorData {
  success: false;
  errors: string[];
}

export type DeleteAuthSignOutData =
  | DeleteAuthSignOutSuccessData
  | DeleteAuthSignOutErrorData;
