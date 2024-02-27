"use client";

import NextLink from "next/link";

import {
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList
} from "@chakra-ui/react";
import { IoMdArrowDropdown } from "react-icons/io";

import SignOutButtonWithModal from "@/app/features/auth/signOut/SignOutButtonWithModal";
import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";
import UserIcon from "@/app/components/atoms/users/UserIcon";

const DropDownUserMenuButton: React.FC = () => {
  const { isLogin, userData } = useGetLoginState();

  if (!isLogin) {
    return null;
  }

  return (
    <Menu>
      <MenuButton p="0">
        <HStack>
          <UserIcon image={userData.image} name={userData.name} diameter={55} />
          <Icon as={IoMdArrowDropdown} />
        </HStack>
      </MenuButton>
      <MenuList color="gray.800">
        <MenuItem as={NextLink} href={`/users/${userData.id}/articles`}>
          自分の投稿
        </MenuItem>
        <MenuDivider />
        <MenuItem as={NextLink} href="/users/likes">
          いいねした投稿
        </MenuItem>
        <MenuDivider />
        <MenuItem as={NextLink} href="/users/comments">
          コメントした投稿
        </MenuItem>
        <MenuDivider />
        <MenuItem as={NextLink} href="/users/account">
          アカウント設定
        </MenuItem>
        <MenuDivider />
        <SignOutButtonWithModal />
      </MenuList>
    </Menu>
  );
};

export default DropDownUserMenuButton;
