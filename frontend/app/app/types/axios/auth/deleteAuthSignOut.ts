import type { DeleteAuthSignOutFailedDataSchema } from "@/app/libs/zod/apiErrorResponses/auth/deleteAuthSignOutDataSchema";
import type { z } from "zod";

export interface DeleteAuthSignOutSuccessData {
  success: true;
}

export type DeleteAuthSignOutFailedData = z.infer<
  typeof DeleteAuthSignOutFailedDataSchema
>;

export type DeleteAuthSignOutErrorData = DeleteAuthSignOutFailedData;

export type DeleteAuthSignOutData =
  | DeleteAuthSignOutSuccessData
  | DeleteAuthSignOutErrorData;
