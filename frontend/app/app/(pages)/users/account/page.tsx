"use client";

import { Box, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import WithRedirectIfLoggedOut from "@/app/features/auth/accessControl/page/WithRedirectIfLoggedOut";
import DeleteAccountButtonWithModal from "@/app/features/auth/deleteAccount/DeleteAccountButtonWithModal";
import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";
import { GoBackLink } from "@/app/components/atoms";
import AccountInformationTabPanel from "@/app/components/organisms/users/AccountInformationTab";

const UserAccountPage: React.FC = () => {
  const { isLogin, userData } = useGetLoginState();

  if (!isLogin) {
    return null;
  }

  const isGuestUser = userData.role == "guest";

  return (
    <Box flex="1" mx="auto" boxShadow="md" p="12" rounded="md">
      <GoBackLink />
      <Tabs isManual variant="enclosed" my="2">
        <TabList>
          <Tab>アカウント設定</Tab>
        </TabList>
        <TabPanels>
          <TabPanel textAlign="center">
            <AccountInformationTabPanel userData={userData} isGuestUser={isGuestUser} />
            <Spacer my="5" />
            {!isGuestUser && <DeleteAccountButtonWithModal />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default WithRedirectIfLoggedOut(UserAccountPage);
