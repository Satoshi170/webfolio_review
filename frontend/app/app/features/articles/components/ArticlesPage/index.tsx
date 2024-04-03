"use client";

import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  HStack,
  Heading,
  MenuDivider
} from "@chakra-ui/react";
import { MdSort } from "react-icons/md";

import CenteredBox from "@/app/components/styledWrappers/CenteredBox";

import { useSortAndFilterArticles } from "../../hooks/useSortAndFilterArticles";
import ArticleCardsGridList from "../ArticleCardsGridList";

import type { ArticleData } from "../../types/articleData";

interface Props {
  articlesData: ArticleData[];
}

const ArticlesPage: React.FC<Props> = ({ articlesData }) => {
  const { initSort, filteredAndSortedArticles, applySortOrder, setExcludeFilter } =
    useSortAndFilterArticles(articlesData);

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
              defaultValue={initSort}
              onChange={(val) => applySortOrder(val as "asc" | "desc" | "popular")}
              title="並び替え"
            >
              <MenuItemOption value="desc">最新順</MenuItemOption>
              <MenuItemOption value="asc">古い順</MenuItemOption>
              <MenuItemOption value="popular">いいねが多い順</MenuItemOption>
            </MenuOptionGroup>
            <MenuDivider />
            <MenuOptionGroup
              type="checkbox"
              onChange={(val) => setExcludeFilter(val as ("maintenance" | "inactive")[])}
              title="除外フィルタ"
            >
              <MenuItemOption value="maintenance">メンテナンス中</MenuItemOption>
              <MenuItemOption value="inactive">サービス終了済み</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </HStack>
      <ArticleCardsGridList articlesData={filteredAndSortedArticles} />
    </CenteredBox>
  );
};

export default ArticlesPage;
