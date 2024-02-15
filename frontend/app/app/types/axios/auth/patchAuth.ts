import type { UnauthorizedResponseData, UserData } from "../../auth";
import type { PatchAuthFailedDataSchema } from "@/app/libs/zod/apiErrorResponses/auth/patchAuthDataSchema";
import type { z } from "zod";



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
