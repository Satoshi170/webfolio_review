"use client";

import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { AiOutlineMore } from "react-icons/ai";

import { useEditMode } from "@/app/hooks/useEditMode";

import DeleteCommentButtonWithModal from "../../../../DeleteCommentButtonWithModal";

const OptionCommentMenuButton: React.FC = () => {
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
        <DeleteCommentButtonWithModal />
      </MenuList>
    </Menu>
  );
};

export default OptionCommentMenuButton;
