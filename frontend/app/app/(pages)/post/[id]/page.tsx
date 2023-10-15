"use client";

import { Box } from "@chakra-ui/react";
import Error from "next/error";
import { usePathname } from "next/navigation";

import LoadingSpinner from "@/app/components/atoms/LoadingSpinner";
import PostCard from "@/app/components/organisms/post/PostCard";
import { useGetPortfoliosByIdOperation } from "@/app/hooks/operations/portfolio/useGetPortfoliosByIdOperation";

const PostPageById: React.FC = () => {
  const pathname = usePathname();
  const { status, portfolioData } = useGetPortfoliosByIdOperation(pathname);

  if (!status) {
    return <LoadingSpinner />;
  }

  if (status === 200 && portfolioData) {
    return (
      <Box h="auto" w="auto" maxW="lg" alignItems="center" mx="auto">
        <PostCard portfolioData={portfolioData} />
      </Box>
    );
  } else {
    return <Error statusCode={status} />;
  }
};

export default PostPageById;
