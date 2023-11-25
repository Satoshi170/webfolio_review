"use client";

import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { AiOutlineMore } from "react-icons/ai";

import DeleteCommentButtonWithModal from "./DeleteCommentButtonWithModal";
import PatchCommentButtonWithModal from "./PatchCommentButtonWithModal";

const OptionCommentMenuButton: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<AiOutlineMore />}
        variant="ghost"
      />
      <MenuList>
        <PatchCommentButtonWithModal />
        <DeleteCommentButtonWithModal />
      </MenuList>
    </Menu>
  );
};

export default OptionCommentMenuButton;
