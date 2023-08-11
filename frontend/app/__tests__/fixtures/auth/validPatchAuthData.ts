import { PatchAuthParams, PatchAuthParamsBase } from "@/app/types/axios/auth/patchAuth";

export const validImageFile: PatchAuthParams = {
  image: {
    size: 2 * 1024 * 1024,
    type: "image/png"
  } as File
};

export const validNonImageParams: PatchAuthParamsBase = {
  name: "testuser"
};
