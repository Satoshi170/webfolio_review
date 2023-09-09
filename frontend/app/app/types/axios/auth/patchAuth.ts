import { UserData } from "../../auth";

export interface PatchAuthParamsBase {
  name?: string;
}

export interface PatchAuthParams extends PatchAuthParamsBase {
  image?: File | null;
}

export interface PatchAuthSuccessData {
  status: "success";
  data: UserData;
}
export interface PatchAuthErrorData {
  status: "error";
  errors: {
    fullMessages: string[];
  };
}

export type PatchAuthData = PatchAuthSuccessData | PatchAuthErrorData;
