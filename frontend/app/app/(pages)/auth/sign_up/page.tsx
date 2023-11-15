"use client";

import { Divider, Heading, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

import WithRedirectIfLoggedIn from "@/app/components/HOCs/WithRedirectIfLoggedIn";
import SubmitFullWideButton from "@/app/components/atoms/SubmitFullWideButton";
import InputField from "@/app/components/molecules/fields/InputField";
import RoundedCenteredBox from "@/app/components/styledWrappers/RoundedCenteredBox";
import { useSignUpForm } from "@/app/hooks/forms/auth/useSignUpForm";

const SignUpPage: React.FC = () => {
  const { register, handleSubmit, errors, isValid, onSubmit, isLoading } =
    useSignUpForm();

  return (
    <RoundedCenteredBox>
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
        <SubmitFullWideButton
          text="登録する"
          isLoading={isLoading}
          isDisabled={!isValid}
        />
        <Divider my="4" />
        <Text>
          すでにアカウントをお持ちですか？
          <Link as={NextLink} href="/auth/sign_in" color="blue">
            サインイン
          </Link>
        </Text>
      </form>
    </RoundedCenteredBox>
  );
};

export default WithRedirectIfLoggedIn(SignUpPage);
