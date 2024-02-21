"use client";

import NextLink from "next/link";

import { Center, Divider, Heading, Link, Text } from "@chakra-ui/react";

import WithRedirectIfLoggedIn from "@/app/features/auth/accessControl/WithRedirectIfLoggedIn";
import GuestLoginButton from "@/app/features/auth/guestLogin/GuestLoginButton";
import SignInForm from "@/app/features/auth/signIn/SignInForm";
import RoundedCenteredBox from "@/app/components/styledWrappers/RoundedCenteredBox";

const SignInPage: React.FC = () => {
  return (
    <RoundedCenteredBox>
      <Heading as="h2" textAlign="center" mb="4">
        ログイン
      </Heading>
      <SignInForm />
      <Divider my="4" />
      <Text>
        初めてのご利用ですか？新規登録は
        <Link as={NextLink} href="/auth/sign_up" color="blue">
          こちら
        </Link>
      </Text>
      <Center>
        <GuestLoginButton />
      </Center>
    </RoundedCenteredBox>
  );
};

export default WithRedirectIfLoggedIn(SignInPage);
