"use client";

import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { AiOutlineMore } from "react-icons/ai";

import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

import DeletePortfoliosButtonWithConfirmation from "./DeletePortfoliosButtonWithConfirmation";
import PatchPostsByIdButton from "./PatchPortfoliosButton";

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
        <PatchPostsByIdButton portfolioData={portfolioData} />
        <DeletePortfoliosButtonWithConfirmation id={portfolioData.id} />
      </MenuList>
    </Menu>
  );
};

export default OptionPostMenuButton;
