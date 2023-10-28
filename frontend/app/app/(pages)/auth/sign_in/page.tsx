"use client";

import { Box, Divider, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

import WithRedirectIfLoggedIn from "@/app/components/HOCs/WithRedirectIfLoggedIn";
import SubmitButton from "@/app/components/atoms/SubmitButton";
import InputField from "@/app/components/molecules/fields/InputField";
import { useSignInForm } from "@/app/hooks/forms/auth/useSignInForm";

const SignInPage: React.FC = () => {
  const { register, handleSubmit, errors, isValid, onSubmit, isLoading } =
    useSignInForm();

  return (
    <Box flex="1" m="auto" maxW="md" boxShadow="md" p="12" rounded="md">
      <Heading as="h2" textAlign="center" mb="4">
        ログイン
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <SubmitButton text="ログイン" isLoading={isLoading} isDisabled={!isValid} />
        <Divider my="4" />
        <Text>
          初めてのご利用ですか？新規登録は
          <Link as={NextLink} href="/auth/sign_up" color="blue">
            こちら
          </Link>
        </Text>
      </form>
    </Box>
  );
};

export default WithRedirectIfLoggedIn(SignInPage);
