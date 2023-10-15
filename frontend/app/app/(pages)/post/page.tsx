"use client";

import { Box } from "@chakra-ui/react";
import { Suspense } from "react";

import LoadingSpinner from "@/app/components/atoms/LoadingSpinner";
import PostCard from "@/app/components/organisms/post/PostCard";
import { useGetPortfoliosOperation } from "@/app/hooks/operations/portfolio/useGetPortfoliosOperation";

const PostsPage: React.FC = () => {
  const portfoliosData = useGetPortfoliosOperation();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Box h="auto" m="auto" maxW="lg" alignItems="center">
        {portfoliosData.map((portfolioData, i) => (
          <PostCard portfolioData={portfolioData} isLink={true} key={i} />
        ))}
      </Box>
    </Suspense>
  );
};

export default PostsPage;
