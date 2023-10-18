"use client";

import { Box } from "@chakra-ui/react";
import Error from "next/error";
import { usePathname } from "next/navigation";

import GoBackLink from "@/app/components/atoms/GoBackLink";
import LoadingSpinner from "@/app/components/atoms/LoadingSpinner";
import PostCard from "@/app/components/organisms/posts/PostCard";
import { useGetUserPortfoliosByUserIdOperation } from "@/app/hooks/operations/portfolio/userPortfolio/useGetUserPortfoliosByUserIdOperation";

const Page: React.FC = () => {
  const pathname = usePathname();
  const { status, portfoliosData } = useGetUserPortfoliosByUserIdOperation(pathname);

  if (!status) {
    return <LoadingSpinner />;
  }

  if (status === 200 && portfoliosData) {
    return (
      <Box h="auto" m="auto" maxW="lg" alignItems="center">
        <GoBackLink />
        {portfoliosData.map((portfolioData, i) => (
          <PostCard portfolioData={portfolioData} linkOptions={{ body: true }} key={i} />
        ))}
      </Box>
    );
  } else {
    return <Error statusCode={status} />;
  }
};

export default Page;
