import { z } from "zod";

import { PatchAuthFailedDataSchema } from "@/app/libs/zod/apiErrorResponses/auth/patchAuthDataSchema";

import { UnauthorizedResponseData, UserData } from "../../auth";

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

export type PatchAuthFailedData = z.infer<typeof PatchAuthFailedDataSchema>;
export type PatchAuthErrorData = PatchAuthFailedData | UnauthorizedResponseData;
export type PatchAuthData = PatchAuthSuccessData | PatchAuthErrorData;
