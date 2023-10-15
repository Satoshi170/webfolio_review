import { z } from "zod";

import { DeleteAuthSignOutFailedDataSchema } from "@/app/libs/zod/apiErrorResponses/auth/deleteAuthSignOutDataSchema";

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
