"use client";

import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { AiOutlineMore } from "react-icons/ai";

import DeleteArticleButtonWithModal from "@/app/features/articles/components/DeleteArticleButtonWithModal";
import { useEditMode } from "@/app/hooks/useEditMode";

const OptionArticleMenuButton: React.FC = () => {
  const { setIsEditMode } = useEditMode();
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<AiOutlineMore />}
        variant="ghost"
      />
      <MenuList>
        <MenuItem onClick={() => setIsEditMode(true)}>編集する</MenuItem>
        <DeleteArticleButtonWithModal />
      </MenuList>
    </Menu>
  );
};

export default OptionArticleMenuButton;
