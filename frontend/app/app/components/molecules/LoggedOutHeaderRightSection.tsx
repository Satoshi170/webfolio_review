"use client";

import {
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  useMediaQuery
} from "@chakra-ui/react";
import NextLink from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";

const LoggedOutHeaderRightSection: React.FC = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <Flex align="center">
      {isLargerThan768 ? (
        <>
          <Button
            as={NextLink}
            href="/auth/sign_up"
            colorScheme="messenger"
            sx={{ "&:hover": { textDecoration: "none" } }}
          >
            新規登録
          </Button>
          <Spacer mx="1" />
          <Button
            as={NextLink}
            href="/auth/sign_in"
            colorScheme="messenger"
            sx={{ "&:hover": { textDecoration: "none" } }}
          >
            サインイン
          </Button>
        </>
      ) : (
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<RxHamburgerMenu />}
            variant="none"
            color="white"
          />
          <MenuList color="gray.800">
            <MenuItem as={NextLink} href="/auth/sign_up">
              新規登録
            </MenuItem>
            <MenuDivider />
            <MenuItem as={NextLink} href="/auth/sign_in">
              サインイン
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
};

export default LoggedOutHeaderRightSection;
