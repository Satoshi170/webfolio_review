import { ZodError } from "zod";

import { validSignInData } from "@/__tests__/fixtures/auth/validSignInData";
import {
  getErrorMessages,
  getErrorMessagesProps
} from "@/__tests__/helpers/zodTestHelpers";
import { signInValidationErrorMessages } from "@/app/constants/errors/auth/signIn/Messages";
import { signInSchema } from "@/app/libs/zod/formValidations/auth/signInSchema";
import { PostAuthSignInCredentials } from "@/app/types/axios/auth/postAuthSignIn";

const getSignInErrorMessages = (
  data: PostAuthSignInCredentials,
  field: keyof PostAuthSignInCredentials
) => {
  const props: getErrorMessagesProps<PostAuthSignInCredentials> = {
    schema: signInSchema,
    data,
    field
  };
  return getErrorMessages(props);
};

describe("signInSchema", () => {
  it("email,passwordが正しい形式の場合エラーをスローしない", () => {
    expect(() => signInSchema.parse(validSignInData)).not.toThrow();
  });

  describe("email", () => {
    it("emailが入力されていない場合、正しいエラーメッセージをスローする", () => {
      const invalidEmailData = { ...validSignInData, email: "" };
      expect(() => signInSchema.parse(invalidEmailData)).toThrow(ZodError);
      const emailErrors = getSignInErrorMessages(invalidEmailData, "email");
      expect(emailErrors[0]).toBe(signInValidationErrorMessages.emailRequired);
    });

    it("emailの形式が正しくない場合、正しいエラーメッセージをスローする", () => {
      const invalidEmailData = { ...validSignInData, email: "aaa" };
      expect(() => signInSchema.parse(invalidEmailData)).toThrow(ZodError);
      const emailErrors = getSignInErrorMessages(invalidEmailData, "email");
      expect(emailErrors[0]).toBe(signInValidationErrorMessages.invalidEmail);
    });
  });

  describe("password", () => {
    it("passwordが入力されていない場合、正しいエラーメッセージをスローする", () => {
      const invalidPasswordData = { ...validSignInData, password: "" };
      expect(() => signInSchema.parse(invalidPasswordData)).toThrow(ZodError);
      const passwordErrors = getSignInErrorMessages(invalidPasswordData, "password");
      expect(passwordErrors[0]).toBe(signInValidationErrorMessages.passwordRequired);
    });
  });
});
