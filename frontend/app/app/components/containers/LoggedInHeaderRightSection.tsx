"use client";

import { Flex, Link, Icon, Box } from "@chakra-ui/react";
import { TfiBell } from "react-icons/tfi";
import { TiMessage } from "react-icons/ti";

const LoggedInHeaderRightSection: React.FC = () => {
  return (
    <Flex gap="4" data-testid="logged-in-header">
      <Link>
        <Icon as={TiMessage} boxSize={12} />
      </Link>
      <Link>
        <Icon as={TfiBell} boxSize={12} />
      </Link>
      <Link>
        <Box borderRadius="full" boxSize="55px" backgroundColor="white" />
      </Link>
    </Flex>
  );
};

export default LoggedInHeaderRightSection;
