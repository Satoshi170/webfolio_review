import { ZodError } from "zod";

import {
  validImageFile,
  validNonImageParams
} from "@/__tests__/fixtures/auth/validPatchAuthData";
import {
  getErrorMessages,
  getErrorMessagesProps
} from "@/__tests__/helpers/zodTestHelpers";
import { patchAuthValidationErrorMessages } from "@/app/constants/auth/patchAuth/Messages";
import {
  PatchAuthImageSchema,
  PatchAuthNonImageSchema
} from "@/app/libs/zod/auth/patchAuthSchema";
import { PatchAuthParams, PatchAuthParamsBase } from "@/app/types/axios/auth/patchAuth";

const getPatchAuthImageErrorMessages = (
  data: PatchAuthParams,
  field: keyof PatchAuthParams
) => {
  const props: getErrorMessagesProps<PatchAuthParams> = {
    schema: PatchAuthImageSchema,
    data,
    field
  };
  return getErrorMessages(props);
};

const getPatchAuthNonImageErrorMessages = (
  data: PatchAuthParamsBase,
  field: keyof PatchAuthParamsBase
) => {
  const props: getErrorMessagesProps<PatchAuthParamsBase> = {
    schema: PatchAuthNonImageSchema,
    data,
    field
  };
  return getErrorMessages(props);
};

describe("PatchAuthImageSchema", () => {
  it("imageが正しい形式の場合エラーをスローしない", () => {
    expect(() => PatchAuthImageSchema.parse(validImageFile)).not.toThrow();
  });

  it("sizeが2MBより大きい場合正しいエラーメッセージをスローする", () => {
    const invalidSizeImageFile = {
      ...validImageFile,
      image: { ...validImageFile.image, size: 2 * 1024 * 1024 + 1 } as File
    };
    expect(() => PatchAuthImageSchema.parse(invalidSizeImageFile)).toThrow(ZodError);
    const imageErrors = getPatchAuthImageErrorMessages(invalidSizeImageFile, "image");
    expect(imageErrors[0]).toBe(patchAuthValidationErrorMessages.imageTooLarge);
  });

  it("typeが指定されたものと違う場合正しいエラーメッセージをスローする", () => {
    const invalidTypeImageFile = {
      ...validImageFile,
      image: { ...validImageFile.image, type: "image/gif" } as File
    };
    expect(() => PatchAuthImageSchema.parse(invalidTypeImageFile)).toThrow(ZodError);
    const imageErrors = getPatchAuthImageErrorMessages(invalidTypeImageFile, "image");
    expect(imageErrors[0]).toBe(patchAuthValidationErrorMessages.invalidImageType);
  });
});

describe("PatchAuthNonImageSchema", () => {
  it("nameが正しい形式の場合エラーをスローしない", () => {
    expect(() => PatchAuthNonImageSchema.parse(validNonImageParams)).not.toThrow();
  });

  describe("name", () => {
    it("nameが26文字以上の場合、正しいエラーメッセージをスローする", () => {
      const invalidNameData = { ...validNonImageParams, name: "a".repeat(26) };
      expect(() => PatchAuthNonImageSchema.parse(invalidNameData)).toThrow(ZodError);
      const nameErrors = getPatchAuthNonImageErrorMessages(invalidNameData, "name");
      expect(nameErrors[0]).toBe(patchAuthValidationErrorMessages.nameTooLong);
    });
  });
});
