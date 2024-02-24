"use client";

import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { AiOutlineMore } from "react-icons/ai";

import DeleteArticleButtonWithModal from "@/app/features/articles/components/DeleteArticleButtonWithModal";
import UpdateArticleButtonWithFormModal from "@/app/features/articles/components/UpdateArticleButtonWithFormModal";

import type { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

interface Props {
  articleData: PortfolioData;
}
const OptionArticleMenuButton: React.FC<Props> = ({ articleData }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<AiOutlineMore />}
        variant="ghost"
      />
      <MenuList>
        <UpdateArticleButtonWithFormModal articleData={articleData} />
        <DeleteArticleButtonWithModal articleId={articleData.id} />
      </MenuList>
    </Menu>
  );
};

export default OptionArticleMenuButton;
