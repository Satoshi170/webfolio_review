"use client";

import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { AiOutlineMore } from "react-icons/ai";

import DeleteArticleButtonWithModal from "@/app/features/articles/components/DeleteArticleButtonWithModal";
import UpdateArticleButtonWithFormModal from "@/app/features/articles/components/UpdateArticleButtonWithFormModal";

const OptionArticleMenuButton: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<AiOutlineMore />}
        variant="ghost"
      />
      <MenuList>
        <UpdateArticleButtonWithFormModal />
        <DeleteArticleButtonWithModal />
      </MenuList>
    </Menu>
  );
};

export default OptionArticleMenuButton;
