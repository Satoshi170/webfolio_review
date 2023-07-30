"use client";

import { Flex, Link, Icon } from "@chakra-ui/react";
import { TfiBell } from "react-icons/tfi";
import { TiMessage } from "react-icons/ti";

import DropDownUserMenu from "../elements/DropDownUserMenu";

const LoggedInHeaderRightSection: React.FC = () => {
  return (
    <Flex gap="4" data-testid="logged-in-header">
      <Link>
        <Icon as={TiMessage} boxSize={12} />
      </Link>
      <Link>
        <Icon as={TfiBell} boxSize={12} />
      </Link>
      <DropDownUserMenu />
    </Flex>
  );
};

export default LoggedInHeaderRightSection;
