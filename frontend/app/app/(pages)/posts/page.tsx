"use client";

import { Suspense } from "react";

import LoadingSpinner from "@/app/components/atoms/LoadingSpinner";
import PostCard from "@/app/components/organisms/posts/PostCard";
import CenteredBox from "@/app/components/styledWrappers/CenteredBox";
import { useGetPortfoliosOperation } from "@/app/hooks/operations/portfolio/useGetPortfoliosOperation";

const PostsPage: React.FC = () => {
  const portfoliosData = useGetPortfoliosOperation();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CenteredBox>
        {portfoliosData.map((portfolioData, i) => (
          <PostCard
            portfolioData={portfolioData}
            linkOptions={{ header: true, body: true }}
            key={i}
          />
        ))}
      </CenteredBox>
    </Suspense>
  );
};

export default PostsPage;
