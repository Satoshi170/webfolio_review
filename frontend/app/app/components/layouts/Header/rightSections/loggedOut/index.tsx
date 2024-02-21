"use client";

import NextLink from "next/link";

import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  useMediaQuery
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";

import SignInLinkButton from "@/app/components/molecules/actionButtons/auth/SignInLinkButton";
import SignUpLinkButton from "@/app/components/molecules/actionButtons/auth/SignUpLinkButton";

const LoggedOutHeaderRightSection: React.FC = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <Flex align="center">
      {isLargerThan768 ? (
        <>
          <SignInLinkButton />
          <Spacer mx="1" />
          <SignUpLinkButton />
        </>
      ) : (
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<RxHamburgerMenu />}
            variant="none"
            color="white"
          />
          <MenuList color="gray.800">
            <MenuItem as={NextLink} href="/auth/sign_up">
              新規登録
            </MenuItem>
            <MenuDivider />
            <MenuItem as={NextLink} href="/auth/sign_in">
              サインイン
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
};

export default LoggedOutHeaderRightSection;
