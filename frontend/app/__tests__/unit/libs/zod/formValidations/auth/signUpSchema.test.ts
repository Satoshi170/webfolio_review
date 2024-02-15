import { ZodError } from "zod";

import { validSignUpData } from "@/__tests__/fixtures/auth/validSignUpData";
import {
  getErrorMessages
} from "@/__tests__/helpers/zodTestHelpers";
import { signUpValidationErrorMessages } from "@/app/constants/errors/auth/signUp/Messages";
import { refinedSignUpSchema } from "@/app/libs/zod/formValidations/auth/signUpSchema";

import type {
  getErrorMessagesProps
} from "@/__tests__/helpers/zodTestHelpers";
import type { PostAuthCredentials } from "@/app/types/axios/auth/postAuth";

const getSignUpErrorMessages = (
  data: PostAuthCredentials,
  field: keyof PostAuthCredentials
) => {
  const props: getErrorMessagesProps<PostAuthCredentials> = {
    schema: refinedSignUpSchema,
    data,
    field
  };
  return getErrorMessages(props);
};

describe("signUpSchema", () => {
  it("name,email,password,password_confirmationが正しい形式の場合エラーをスローしない", () => {
    expect(() => refinedSignUpSchema.parse(validSignUpData)).not.toThrow();
  });

  describe("name", () => {
    it("nameが入力されていない場合、正しいエラーメッセージをスローする", () => {
      const invalidNameData = { ...validSignUpData, name: "" };
      expect(() => refinedSignUpSchema.parse(invalidNameData)).toThrow(ZodError);
      const nameErrors = getSignUpErrorMessages(invalidNameData, "name");
      expect(nameErrors[0]).toBe(signUpValidationErrorMessages.nameRequired);
    });

    it("nameが26文字以上の場合、正しいエラーメッセージをスローする", () => {
      const invalidNameData = { ...validSignUpData, name: "a".repeat(26) };
      expect(() => refinedSignUpSchema.parse(invalidNameData)).toThrow(ZodError);
      const nameErrors = getSignUpErrorMessages(invalidNameData, "name");
      expect(nameErrors[0]).toBe(signUpValidationErrorMessages.nameTooLong);
    });
  });

  describe("email", () => {
    it("emailが入力されていない場合、正しいエラーメッセージをスローする", () => {
      const invalidEmailData = { ...validSignUpData, email: "" };
      expect(() => refinedSignUpSchema.parse(invalidEmailData)).toThrow(ZodError);
      const emailErrors = getSignUpErrorMessages(invalidEmailData, "email");
      expect(emailErrors[0]).toBe(signUpValidationErrorMessages.emailRequired);
    });

    it("emailの形式が正しくない場合、正しいエラーメッセージをスローする", () => {
      const invalidEmailData = { ...validSignUpData, email: "aaa" };
      expect(() => refinedSignUpSchema.parse(invalidEmailData)).toThrow(ZodError);
      const emailErrors = getSignUpErrorMessages(invalidEmailData, "email");
      expect(emailErrors[0]).toBe(signUpValidationErrorMessages.invalidEmail);
    });
  });

  describe("password", () => {
    it("passwordが入力されていない場合、正しいエラーメッセージをスローする", () => {
      const invalidPasswordData = { ...validSignUpData, password: "" };
      expect(() => refinedSignUpSchema.parse(invalidPasswordData)).toThrow(ZodError);
      const passwordErrors = getSignUpErrorMessages(invalidPasswordData, "password");
      expect(passwordErrors[0]).toBe(signUpValidationErrorMessages.passwordRequired);
    });

    it("passwordが入力されていて6文字未満の場合、正しいエラーメッセージをスローする", () => {
      const invalidPasswordData = { ...validSignUpData, password: "aaaaa" };
      expect(() => refinedSignUpSchema.parse(invalidPasswordData)).toThrow(ZodError);
      const passwordErrors = getSignUpErrorMessages(invalidPasswordData, "password");
      expect(passwordErrors[0]).toBe(signUpValidationErrorMessages.passwordTooShort);
    });
  });

  describe("passwordConfirmation", () => {
    it("passwordConfirmationが入力されていない場合、正しいエラーメッセージをスローする", () => {
      const invalidPasswordConfirmationData = {
        ...validSignUpData,
        passwordConfirmation: ""
      };
      expect(() => refinedSignUpSchema.parse(invalidPasswordConfirmationData)).toThrow(
        ZodError
      );
      const passwordConfirmationErrors = getSignUpErrorMessages(
        invalidPasswordConfirmationData,
        "passwordConfirmation"
      );
      expect(passwordConfirmationErrors[0]).toBe(
        signUpValidationErrorMessages.passwordConfirmationRequired
      );
    });

    it("passwordとpasswordConfirmationが一致していない場合、正しいエラーメッセージをスローする", () => {
      const invalidPasswordConfirmationData = {
        ...validSignUpData,
        passwordConfirmation: "differentpassword"
      };
      expect(() => refinedSignUpSchema.parse(invalidPasswordConfirmationData)).toThrow(
        ZodError
      );
      const passwordConfirmationErrors = getSignUpErrorMessages(
        invalidPasswordConfirmationData,
        "passwordConfirmation"
      );
      expect(passwordConfirmationErrors[0]).toBe(
        signUpValidationErrorMessages.passwordConfirmationMismatch
      );
    });
  });
});
