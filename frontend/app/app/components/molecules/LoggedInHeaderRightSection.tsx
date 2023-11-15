"use client";

import { Flex } from "@chakra-ui/react";

import CreatePostButtonWithModal from "../organisms/apiActionButtons/posts/CreatePostButtonWithModal";
import DropDownUserMenuButton from "../organisms/users/DropDownUserMenu";

const LoggedInHeaderRightSection: React.FC = () => {
  return (
    <Flex gap="7" alignItems="center">
      <CreatePostButtonWithModal />
      <DropDownUserMenuButton />
    </Flex>
  );
};

export default LoggedInHeaderRightSection;
