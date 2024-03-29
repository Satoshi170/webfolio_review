"use client";

import { VStack, Text } from "@chakra-ui/react";

import SignUpLinkButton from "@/app/features/auth/components/SignUpLinkButton";
import GuestLoginButton from "@/app/features/auth/guestLogin/GuestLoginButton";

const AboutSiteSection: React.FC = () => {
  return (
    <>
      <Text whiteSpace="pre-line" textAlign="center">
        {`ポートフォリオを公開する掲示板サイトです。
        ゲストユーザーでもアカウントの編集以外は可能です。
        ゲストログインを推奨します。`}
      </Text>
      <VStack my="3">
        <SignUpLinkButton />
        <GuestLoginButton />
      </VStack>
    </>
  );
};

export default AboutSiteSection;
