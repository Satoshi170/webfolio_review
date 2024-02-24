"use client";

import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { AiOutlineMore } from "react-icons/ai";

import DeleteArticleButtonWithModal from "@/app/features/articles/components/DeleteArticleButtonWithModal";
import UpdateArticleButtonWithFormModal from "@/app/features/articles/components/UpdateArticleButtonWithFormModal";

import type { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

interface Props {
  portfolioData: PortfolioData;
}
const OptionPostMenuButton: React.FC<Props> = ({ portfolioData }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<AiOutlineMore />}
        variant="ghost"
      />
      <MenuList>
        <UpdateArticleButtonWithFormModal articleData={portfolioData} />
        <DeleteArticleButtonWithModal articleId={portfolioData.id} />
      </MenuList>
    </Menu>
  );
};

export default OptionPostMenuButton;
