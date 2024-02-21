"use client";

import { Heading, Spacer, Text } from "@chakra-ui/react";

import UpdateAccountForm from "@/app/features/auth/updateAccount/UpdateAccountForm";
import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";

import RoundedCenteredBox from "../../styledWrappers/RoundedCenteredBox";

const AccountInformationTabPanel: React.FC = () => {
  const { isLogin, userData } = useGetLoginState();

  if (!isLogin) {
    return null;
  }

  const isGuestUser = userData.role == "guest";

  return (
    <RoundedCenteredBox>
      <Heading as="h2" textAlign="center" mb="4">
        アカウント情報
      </Heading>
      <UpdateAccountForm userName={userData.name} isGuestUser={isGuestUser} />
      {isGuestUser && (
        <>
          <Spacer my="4" />
          <Text color="red.500" fontSize="sm">
            ゲストユーザーはアカウント情報を更新できません
          </Text>
        </>
      )}
    </RoundedCenteredBox>
  );
};

export default AccountInformationTabPanel;
