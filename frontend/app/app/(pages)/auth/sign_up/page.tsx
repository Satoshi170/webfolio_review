"use client";

import NextLink from "next/link";

import { Divider, Heading, Text, Link } from "@chakra-ui/react";

import WithRedirectIfLoggedIn from "@/app/features/auth/accessControl/page/WithRedirectIfLoggedIn";
import SignUpForm from "@/app/features/auth/signUp/SignUpForm";
import RoundedCenteredBox from "@/app/components/styledWrappers/RoundedCenteredBox";

const SignUpPage: React.FC = () => {
  return (
    <RoundedCenteredBox>
      <Heading as="h2" textAlign="center" mb="4">
        アカウント作成
      </Heading>
      <SignUpForm />
      <Divider my="4" />
      <Text>
        すでにアカウントをお持ちですか？
        <Link as={NextLink} href="/auth/sign_in" color="blue">
          サインイン
        </Link>
      </Text>
    </RoundedCenteredBox>
  );
};

export default WithRedirectIfLoggedIn(SignUpPage);
