"use client";

import { Flex } from "@chakra-ui/react";

import CreatePostButtonWithModal from "@/app/components/organisms/apiActionButtons/posts/CreatePostButtonWithModal";

import DropDownUserMenuButton from "./DropDownUserMenu";

const LoggedInHeaderRightSection: React.FC = () => {
  return (
    <Flex gap="7" alignItems="center">
      <CreatePostButtonWithModal />
      <DropDownUserMenuButton />
    </Flex>
  );
};

export default LoggedInHeaderRightSection;
