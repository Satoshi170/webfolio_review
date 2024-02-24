"use client";

import { Flex } from "@chakra-ui/react";

import CreateArticleButtonWithFormModal from "@/app/features/articles/components/CreateArticleButtonWithFormModal";

import DropDownUserMenuButton from "./DropDownUserMenu";

const LoggedInHeaderRightSection: React.FC = () => {
  return (
    <Flex gap="7" alignItems="center">
      <CreateArticleButtonWithFormModal />
      <DropDownUserMenuButton />
    </Flex>
  );
};

export default LoggedInHeaderRightSection;
