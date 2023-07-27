import { ZodError } from "zod";

import {
  getErrorMessages,
  getErrorMessagesProps
} from "@/__tests__/helpers/zodTestHelpers";
import { refinedSignUpSchema } from "@/app/libs/zod/auth/signUpSchema";
import { SignUpCredentials } from "@/app/types/auth";

const getSignUpErrorMessages = (
  data: SignUpCredentials,
  field: keyof SignUpCredentials
) => {
  const props: getErrorMessagesProps<SignUpCredentials> = {
    schema: refinedSignUpSchema,
    data,
    field
  };
  return getErrorMessages(props);
};

const validData = {
  name: "testuser",
  email: "test@example.com",
  password: "password",
  passwordConfirmation: "password"
};

describe("signUpSchema", () => {
  it("name,email,password,password_confirmationが正しい形式の場合エラーをスローしない", () => {
    expect(() => refinedSignUpSchema.parse(validData)).not.toThrow();
  });

  describe("name", () => {
    it("nameが入力されていない場合、正しいエラーメッセージをスローする", () => {
      const invalidNameData = { ...validData, name: "" };
      expect(() => refinedSignUpSchema.parse(invalidNameData)).toThrow(ZodError);
      const nameErrors = getSignUpErrorMessages(invalidNameData, "name");
      expect(nameErrors[0]).toBe("ユーザー名は必須です");
    });

    it("nameが26文字以上の場合、正しいエラーメッセージをスローする", () => {
      const invalidNameData = { ...validData, name: "a".repeat(26) };
      expect(() => refinedSignUpSchema.parse(invalidNameData)).toThrow(ZodError);
      const nameErrors = getSignUpErrorMessages(invalidNameData, "name");
      expect(nameErrors[0]).toBe("ユーザー名は25文字以内である必要があります");
    });
  });

  describe("email", () => {
    it("emailが入力されていない場合、正しいエラーメッセージをスローする", () => {
      const invalidEmailData = { ...validData, email: "" };
      expect(() => refinedSignUpSchema.parse(invalidEmailData)).toThrow(ZodError);
      const emailErrors = getSignUpErrorMessages(invalidEmailData, "email");
      expect(emailErrors[0]).toBe("メールアドレスは必須です");
    });

    it("emailの形式が正しくない場合、正しいエラーメッセージをスローする", () => {
      const invalidEmailData = { ...validData, email: "aaa" };
      expect(() => refinedSignUpSchema.parse(invalidEmailData)).toThrow(ZodError);
      const emailErrors = getSignUpErrorMessages(invalidEmailData, "email");
      expect(emailErrors[0]).toBe("無効なメールアドレス形式です");
    });
  });

  describe("password", () => {
    it("passwordが入力されていない場合、正しいエラーメッセージをスローする", () => {
      const invalidPasswordData = { ...validData, password: "" };
      expect(() => refinedSignUpSchema.parse(invalidPasswordData)).toThrow(ZodError);
      const passwordErrors = getSignUpErrorMessages(invalidPasswordData, "password");
      expect(passwordErrors[0]).toBe("パスワードは必須です");
    });

    it("passwordが入力されていて6文字未満の場合、正しいエラーメッセージをスローする", () => {
      const invalidPasswordData = { ...validData, password: "aaaaa" };
      expect(() => refinedSignUpSchema.parse(invalidPasswordData)).toThrow(ZodError);
      const passwordErrors = getSignUpErrorMessages(invalidPasswordData, "password");
      expect(passwordErrors[0]).toBe("パスワードは6文字以上である必要があります");
    });
  });

  describe("passwordConfirmation", () => {
    it("passwordConfirmationが入力されていない場合、正しいエラーメッセージをスローする", () => {
      const invalidPasswordConfirmationData = { ...validData, passwordConfirmation: "" };
      expect(() => refinedSignUpSchema.parse(invalidPasswordConfirmationData)).toThrow(
        ZodError
      );
      const passwordConfirmationErrors = getSignUpErrorMessages(
        invalidPasswordConfirmationData,
        "passwordConfirmation"
      );
      expect(passwordConfirmationErrors[0]).toBe("パスワードをもう一度入力してください");
    });

    it("passwordとpasswordConfirmationが一致していない場合、正しいエラーメッセージをスローする", () => {
      const invalidPasswordConfirmationData = {
        ...validData,
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
        "パスワードと確認用パスワードが一致しません"
      );
    });
  });
});
