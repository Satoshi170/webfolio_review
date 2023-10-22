"use client";

import {
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList
} from "@chakra-ui/react";
import NextLink from "next/link";
import { IoMdArrowDropdown } from "react-icons/io";
import { useRecoilValue } from "recoil";

import { LoggedInState, loginState } from "@/app/stores/atoms/loginState";

import UserIcon from "../../atoms/users/UserIcon";
import SignOutButtonWithConfirmation from "../../molecules/actionButtons/auth/SignOutButtonWithConfirmation";

const DropDownUserMenuButton: React.FC = () => {
  const { userData } = useRecoilValue(loginState) as LoggedInState;

  return (
    <Menu>
      <MenuButton p="0">
        <HStack>
          <UserIcon image={userData.image} name={userData.name} diameter={55} />
          <Icon as={IoMdArrowDropdown} />
        </HStack>
      </MenuButton>
      <MenuList color="gray.800">
        <MenuItem as={NextLink} href={`/users/${userData.id}/posts`}>
          自分の投稿
        </MenuItem>
        <MenuDivider />
        <MenuItem as={NextLink} href="/users/account">
          アカウント設定
        </MenuItem>
        <MenuDivider />
        <SignOutButtonWithConfirmation />
      </MenuList>
    </Menu>
  );
};

export default DropDownUserMenuButton;
