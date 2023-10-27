"use client";

import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import LoadingSpinner from "./components/atoms/LoadingSpinner";
import SeeMoreButton from "./components/atoms/SeeMoreButton";
import PostCard from "./components/organisms/posts/PostCard";
import CenteredBox from "./components/styledWrappers/CenteredBox";
import { useGetPopularAndNewPortfoliosOperation } from "./hooks/operations/portfolio/useGetPopularAndNewPortfoliosOperation";

const HomePage: React.FC = () => {
  const { latestPortfoliosData, popularPortfoliosData } =
    useGetPopularAndNewPortfoliosOperation();
  const router = useRouter();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CenteredBox>
        <Heading my="2">最近の投稿</Heading>
        {latestPortfoliosData.map((portfolioData, i) => (
          <PostCard
            portfolioData={portfolioData}
            linkOptions={{ header: true, body: true }}
            key={i}
          />
        ))}
        <SeeMoreButton onClick={() => router.push("/posts")} />
        <Heading my="2">話題の投稿</Heading>
        {popularPortfoliosData.map((portfolioData, i) => (
          <PostCard
            portfolioData={portfolioData}
            linkOptions={{ header: true, body: true }}
            key={i}
          />
        ))}
        <SeeMoreButton onClick={() => router.push("/posts")} />
      </CenteredBox>
    </Suspense>
  );
};

export default HomePage;
