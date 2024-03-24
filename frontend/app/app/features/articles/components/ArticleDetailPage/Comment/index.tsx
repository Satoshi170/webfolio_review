"use client";

import {
  Box,
  Divider,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup
} from "@chakra-ui/react";
import { MdSort } from "react-icons/md";

import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";

import CommentsList from "../../../_comments/components/CommentsList";
import CreateCommentForm from "../../../_comments/components/CreateCommentForm";
import { useSortComments } from "../../../hooks/useSortComments";

import type { CommentData } from "../../../_comments/types";

interface Props {
  commentsData: CommentData[] | [];
}

const CommentSection: React.FC<Props> = ({ commentsData }) => {
  const { sortedComments, sortOrder } = useSortComments(commentsData);
  const { isLogin } = useGetLoginState();

  return (
    <Box bg="white">
      <HStack my="4">
        <Heading as="h3" textAlign="center" size="md" flex="1">
          コメント
        </Heading>
        <Menu closeOnSelect={false}>
          <MenuButton
            as={IconButton}
            aria-label="comment-options"
            icon={<MdSort />}
            variant="unstyled"
          />
          <MenuList>
            <MenuOptionGroup
              type="radio"
              defaultValue="desc"
              onChange={(val) => sortOrder(val as "asc" | "desc")}
              title="並び替え"
            >
              <MenuItemOption value="desc">最新順</MenuItemOption>
              <MenuItemOption value="asc">古い順</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </HStack>
      <Divider />
      <CommentsList commentsData={sortedComments} />
      <Divider />
      {isLogin && <CreateCommentForm />}
    </Box>
  );
};

export default CommentSection;
