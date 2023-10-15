"use client";

import { Flex } from "@chakra-ui/react";

import CreatePostButtonWithModal from "./actionButtons/post/CreatePostButtonWithModal";
import DropDownUserMenuButton from "../molecules/actionButtons/DropDownUserMenu";

const LoggedInHeaderRightSection: React.FC = () => {
  return (
    <Flex gap="7" alignItems="center">
      <CreatePostButtonWithModal />
      <DropDownUserMenuButton />
    </Flex>
  );
};

export default LoggedInHeaderRightSection;
