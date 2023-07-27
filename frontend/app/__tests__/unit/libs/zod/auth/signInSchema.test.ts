import { ZodError } from "zod";

import {
  getErrorMessages,
  getErrorMessagesProps
} from "@/__tests__/helpers/zodTestHelpers";
import { signInValidationErrorMessages } from "@/app/constants/auth/signIn/Messages";
import { signInSchema } from "@/app/libs/zod/auth/signInSchema";
import { SignInCredentials } from "@/app/types/auth";

const getSignInErrorMessages = (
  data: SignInCredentials,
  field: keyof SignInCredentials
) => {
  const props: getErrorMessagesProps<SignInCredentials> = {
    schema: signInSchema,
    data,
    field
  };
  return getErrorMessages(props);
};

const validData = {
  email: "test@example.com",
  password: "password"
};

describe("signInSchema", () => {
  it("email,passwordが正しい形式の場合エラーをスローしない", () => {
    expect(() => signInSchema.parse(validData)).not.toThrow();
  });

  describe("email", () => {
    it("emailが入力されていない場合、正しいエラーメッセージをスローする", () => {
      const invalidEmailData = { ...validData, email: "" };
      expect(() => signInSchema.parse(invalidEmailData)).toThrow(ZodError);
      const emailErrors = getSignInErrorMessages(invalidEmailData, "email");
      expect(emailErrors[0]).toBe(signInValidationErrorMessages.emailRequired);
    });

    it("emailの形式が正しくない場合、正しいエラーメッセージをスローする", () => {
      const invalidEmailData = { ...validData, email: "aaa" };
      expect(() => signInSchema.parse(invalidEmailData)).toThrow(ZodError);
      const emailErrors = getSignInErrorMessages(invalidEmailData, "email");
      expect(emailErrors[0]).toBe(signInValidationErrorMessages.invalidEmail);
    });
  });

  describe("password", () => {
    it("passwordが入力されていない場合、正しいエラーメッセージをスローする", () => {
      const invalidPasswordData = { ...validData, password: "" };
      expect(() => signInSchema.parse(invalidPasswordData)).toThrow(ZodError);
      const passwordErrors = getSignInErrorMessages(invalidPasswordData, "password");
      expect(passwordErrors[0]).toBe(signInValidationErrorMessages.passwordRequired);
    });
  });
});
