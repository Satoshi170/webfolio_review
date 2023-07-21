"use client";

import { Box, Divider, Heading, Text, Link } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import NextLink from "next/link";
import { useForm } from "react-hook-form";

import InputField from "@/app/components/auth/InputField";
import SubmitButton from "@/app/components/auth/SubmitButton";
import { useAuthForm } from "@/app/hooks/auth/useAuthForm";
import { signUp } from "@/app/libs/axios/auth/signUp";
import { refinedSignUpSchema } from "@/app/libs/zod/auth/schemas";
import { SignUpCredentials } from "@/app/types/auth";

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpCredentials>({
    resolver: zodResolver(refinedSignUpSchema),
    mode: "onChange"
  });

  const { onSubmit, isLoading } = useAuthForm(signUp, "/user/account");

  return (
    <Box flex="1" m="auto" maxW="md" boxShadow="md" p="12" rounded="md">
      <Heading as="h2" textAlign="center" mb="4">
        アカウント作成
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="name"
          label="ユーザー名"
          register={register}
          error={errors.name}
        />
        <InputField
          name="email"
          label="メールアドレス"
          register={register}
          error={errors.email}
        />
        <InputField
          name="password"
          label="パスワード"
          type="password"
          register={register}
          error={errors.password}
        />
        <InputField
          name="passwordConfirmation"
          label="パスワード(再確認)"
          type="password"
          register={register}
          error={errors.passwordConfirmation}
        />
        <SubmitButton text="登録する" isLoading={isLoading} />
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

export default SignUp;
