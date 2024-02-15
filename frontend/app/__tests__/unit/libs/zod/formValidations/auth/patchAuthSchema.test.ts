import { ZodError } from "zod";

import {
  validImageFile,
  validNonImageParams
} from "@/__tests__/fixtures/auth/validPatchAuthData";
import { getErrorMessages } from "@/__tests__/helpers/zodTestHelpers";
import { patchAuthValidationErrorMessages } from "@/app/constants/errors/auth/patchAuth/Messages";
import {
  PatchAuthImageSchema,
  PatchAuthNonImageSchema
} from "@/app/libs/zod/formValidations/auth/patchAuthSchema";

import type { getErrorMessagesProps } from "@/__tests__/helpers/zodTestHelpers";
import type { PatchAuthParamsBase } from "@/app/types/axios/auth/patchAuth";

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

interface falseResult {
  success: false;
  error: ZodError;
}

describe("PatchAuthImageSchema", () => {
  it("imageが正しい形式の場合エラーをスローしない", () => {
    const result = PatchAuthImageSchema.safeParse({ image: validImageFile });
    expect(result.success).toBe(true);
  });

  it("sizeが2MBより大きい場合正しいエラーメッセージをスローする", () => {
    const invalidSizeImageFile = {
      ...validImageFile,
      size: 2 * 1024 * 1024 + 1
    };
    const result = PatchAuthImageSchema.safeParse({ image: invalidSizeImageFile });
    expect(result.success).toBe(false);
    expect((result as falseResult).error.errors[0].message).toBe(
      patchAuthValidationErrorMessages.imageTooLarge
    );
  });

  it("typeが指定されたものと違う場合正しいエラーメッセージをスローする", () => {
    const invalidTypeImageFile = {
      ...validImageFile,
      type: "image/gif"
    };
    const result = PatchAuthImageSchema.safeParse({ image: invalidTypeImageFile });
    expect(result.success).toBe(false);
    expect((result as falseResult).error.errors[0].message).toBe(
      patchAuthValidationErrorMessages.invalidImageType
    );
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
