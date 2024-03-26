"use client";

import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  HStack,
  Heading
} from "@chakra-ui/react";
import { MdSort } from "react-icons/md";

import CenteredBox from "@/app/components/styledWrappers/CenteredBox";

import { useSortArticles } from "../../hooks/useSortArticles";
import ArticleCardsGridList from "../ArticleCardsGridList";

import type { ArticleData } from "../../types/articleData";

interface Props {
  articlesData: ArticleData[];
}
const ArticlesPage: React.FC<Props> = ({ articlesData }) => {
  const { sortedArticles, sortOrder } = useSortArticles(articlesData);

  return (
    <CenteredBox>
      <HStack my="4" position="relative">
        <Heading as="h3" textAlign="center" size="md" w="full">
          記事一覧
        </Heading>
        <Menu closeOnSelect={false}>
          <MenuButton
            as={IconButton}
            aria-label="comment-options"
            icon={<MdSort />}
            variant="unstyled"
            position="absolute"
            right="0"
          />
          <MenuList>
            <MenuOptionGroup
              type="radio"
              defaultValue="desc"
              onChange={(val) => sortOrder(val as "asc" | "desc" | "popular")}
              title="並び替え"
            >
              <MenuItemOption value="desc">最新順</MenuItemOption>
              <MenuItemOption value="asc">古い順</MenuItemOption>
              <MenuItemOption value="popular">いいねが多い順</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </HStack>
      <ArticleCardsGridList articlesData={sortedArticles} />
    </CenteredBox>
  );
};

export default ArticlesPage;
