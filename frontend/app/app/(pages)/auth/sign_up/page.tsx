"use client";

import { Box, Divider, Heading, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import InputField from "@/app/components/auth/InputField";
import SubmitButton from "@/app/components/auth/SubmitButton";
import WithRedirectIfLoggedIn from "@/app/components/hoc/WithRedirectIfLoggedIn";
import { useSignUpForm } from "@/app/hooks/forms/auth/useSignUpForm";
const SignUp: React.FC = () => {
  const { register, handleSubmit, errors, isValid, onSubmit, isLoading } =
    useSignUpForm();

  return (
    <Box flex="1" m="auto" maxW="md" boxShadow="md" p="12" rounded="md">
      <Heading as="h2" textAlign="center" mb="4">
        アカウント作成
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="name"
          label="ユーザー名"
          isRequired={true}
          register={register}
          error={errors.name}
        />
        <InputField
          name="email"
          label="メールアドレス"
          isRequired={true}
          register={register}
          error={errors.email}
        />
        <InputField
          name="password"
          label="パスワード"
          type="password"
          isRequired={true}
          register={register}
          error={errors.password}
        />
        <InputField
          name="passwordConfirmation"
          label="パスワード(再確認)"
          type="password"
          isRequired={true}
          register={register}
          error={errors.passwordConfirmation}
        />
        <SubmitButton text="登録する" isLoading={isLoading} isDisabled={!isValid} />
        <Divider my="4" />
        <Text>
          すでにアカウントをお持ちですか？
          <Link as={NextLink} href="/auth/sign_in" color="blue">
            サインイン
          </Link>
        </Text>
      </form>
    </Box>
  );
};

export default WithRedirectIfLoggedIn(SignUp);
