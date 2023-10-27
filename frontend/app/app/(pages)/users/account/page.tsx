"use client";

import {
  Box,
  Heading,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";

import WithRedirectIfLoggedOut from "@/app/components/HOCs/WithRedirectIfLoggedOut";
import GoBackLink from "@/app/components/atoms/GoBackLink";
import AccountDeleteButtonWithConfirmation from "@/app/components/molecules/actionButtons/auth/AccountDeleteButtonWithConfirmation";
import AccountInformationTabPanel from "@/app/components/organisms/users/AccountInformationTab";

const UserAccountPage: React.FC = () => {
  return (
    <Box flex="1" mx="auto" boxShadow="md" p="12" rounded="md">
      <GoBackLink />
      <Tabs isManual variant="enclosed" my="2">
        <TabList>
          <Tab>アカウント設定</Tab>
          <Tab>プロフィール設定</Tab>
        </TabList>
        <TabPanels>
          <TabPanel textAlign="center">
            <AccountInformationTabPanel />
            <Spacer my="5" />
            <AccountDeleteButtonWithConfirmation />
          </TabPanel>
          <TabPanel>
            <Heading>プロフィール設定</Heading>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default WithRedirectIfLoggedOut(UserAccountPage);
