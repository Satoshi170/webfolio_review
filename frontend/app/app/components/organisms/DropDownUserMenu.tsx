"use client";

import { Image, Link } from "@chakra-ui/next-js";
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

import SignOutButtonWithConfirmation from "../molecules/SignOutButtonWithConfirmation";

const DropDownUserMenu: React.FC = () => {
  const { data } = useRecoilValue(loginState) as LoggedInState;
  const userIcon = data.image;

  return (
    <Menu>
      <MenuButton p="0">
        <HStack>
          <Image
            src={userIcon}
            alt="userImage"
            width="55"
            height="55"
            borderRadius="full"
            m="0"
          />
          <Icon as={IoMdArrowDropdown} />
        </HStack>
      </MenuButton>
      <MenuList color="gray.800">
        <MenuItem pr="0" py="0">
          <Link
            as={NextLink}
            href="/user/account"
            h="full"
            w="full"
            sx={{ "&:hover": { textDecoration: "none" } }}
          >
            アカウント設定
          </Link>
        </MenuItem>
        <MenuDivider />
        <MenuItem pr="0" py="0">
          <SignOutButtonWithConfirmation />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default DropDownUserMenu;
