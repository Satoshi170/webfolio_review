"use client";

import { Heading, Spacer, Text } from "@chakra-ui/react";

import UpdateAccountForm from "@/app/features/auth/updateAccount/UpdateAccountForm";

import RoundedCenteredBox from "../../styledWrappers/RoundedCenteredBox";

import type { MyData } from "@/app/types/auth";

interface Props {
  userData: MyData;
  isGuestUser: boolean;
}

const AccountInformationTabPanel: React.FC<Props> = ({ userData, isGuestUser }) => {
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
