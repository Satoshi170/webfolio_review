"use client";

import {
  Box,
  Heading,
  Link,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import WithRedirectIfLoggedOut from "@/app/components/HOCs/WithRedirectIfLoggedOut";
import AccountDeleteButtonWithConfirmation from "@/app/components/molecules/actionButtons/auth/AccountDeleteButtonWithConfirmation";
import AccountInformationTabPanel from "@/app/components/organisms/user/AccountInformationTab";

const AccountPage: React.FC = () => {
  const router = useRouter();
  return (
    <Box flex="1" mx="auto" boxShadow="md" p="12" rounded="md">
      <Link as="button" onClick={() => router.back()} color="blue">
        ←戻る
      </Link>
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

export default WithRedirectIfLoggedOut(AccountPage);
