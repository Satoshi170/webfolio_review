"use client";

import { Divider, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

import WithRedirectIfLoggedIn from "@/app/components/HOCs/WithRedirectIfLoggedIn";
import SubmitFullWideButton from "@/app/components/atoms/SubmitFullWideButton";
import InputField from "@/app/components/molecules/fields/InputField";
import RoundedCenteredBox from "@/app/components/styledWrappers/RoundedCenteredBox";
import { useSignInForm } from "@/app/hooks/forms/auth/useSignInForm";

const SignInPage: React.FC = () => {
  const { register, handleSubmit, errors, isValid, onSubmit, isLoading } =
    useSignInForm();

  return (
    <RoundedCenteredBox>
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
        <SubmitFullWideButton
          text="ログイン"
          isLoading={isLoading}
          isDisabled={!isValid}
        />
        <Divider my="4" />
        <Text>
          初めてのご利用ですか？新規登録は
          <Link as={NextLink} href="/auth/sign_up" color="blue">
            こちら
          </Link>
        </Text>
      </form>
    </RoundedCenteredBox>
  );
};

export default WithRedirectIfLoggedIn(SignInPage);
