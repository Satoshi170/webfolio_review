"use client";

import { Image } from "@chakra-ui/next-js";
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

import sampleUserIcon from "@/app/favicon.ico";

const DropDownUserMenu: React.FC = () => {
  return (
    <Menu>
      <MenuButton>
        <HStack>
          <Image
            borderRadius="full"
            boxSize="55px"
            src={sampleUserIcon}
            alt="userImage"
          />
          <Icon as={IoMdArrowDropdown} />
        </HStack>
      </MenuButton>
      <MenuList color="gray.800">
        <MenuItem as="a" href="/user/account">
          アカウント設定
        </MenuItem>
        <MenuDivider />
        <MenuItem>ログアウト</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default DropDownUserMenu;
