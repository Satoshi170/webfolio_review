"use client";

import { Grid } from "@chakra-ui/react";

import ArticleCard from "../ArticleCard";

import type { ArticleData } from "../../types/articleData";

interface Props {
  articlesData: ArticleData[];
}

const ArticleCardsGridList: React.FC<Props> = ({ articlesData }) => {
  return (
    <Grid
      w="full"
      templateColumns={{
        sm: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)"
      }}
      gap={2}
    >
      {articlesData.map((articleData, i) => (
        <ArticleCard articleData={articleData} key={i} />
      ))}
    </Grid>
  );
};

export default ArticleCardsGridList;
