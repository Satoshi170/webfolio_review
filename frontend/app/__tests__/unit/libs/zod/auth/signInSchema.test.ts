import { ZodError } from "zod";

import {
  getErrorMessages,
  getErrorMessagesProps
} from "@/__tests__/helpers/zodTestHelpers";
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
      expect(emailErrors[0]).toBe("メールアドレスを入力してください");
    });

    it("emailの形式が正しくない場合、正しいエラーメッセージをスローする", () => {
      const invalidEmailData = { ...validData, email: "aaa" };
      expect(() => signInSchema.parse(invalidEmailData)).toThrow(ZodError);
      const emailErrors = getSignInErrorMessages(invalidEmailData, "email");
      expect(emailErrors[0]).toBe("無効なメールアドレス形式です");
    });
  });

  describe("password", () => {
    it("passwordが入力されていない場合、正しいエラーメッセージをスローする", () => {
      const invalidPasswordData = { ...validData, password: "" };
      expect(() => signInSchema.parse(invalidPasswordData)).toThrow(ZodError);
      const passwordErrors = getSignInErrorMessages(invalidPasswordData, "password");
      expect(passwordErrors[0]).toBe("パスワードを入力してください");
    });
  });
});
