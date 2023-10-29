"use client";

import { Card } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

import { loginState } from "@/app/stores/atoms/loginState";
import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

import PostCardBody from "../../molecules/posts/PostCardBody";
import PostCardFooter from "../../molecules/posts/PostCardFooter";
import PostCardHeader from "../../molecules/posts/PostCardHeader";

interface LinkOptions {
  header?: boolean;
  body?: boolean;
}
interface Props {
  portfolioData: PortfolioData;
  linkOptions?: LinkOptions;
}

const PostCard: React.FC<Props> = ({ portfolioData, linkOptions }) => {
  const { user } = portfolioData;
  const { isLogin, userData } = useRecoilValue(loginState);
  const isUserPost = isLogin ? userData.id == user.id : false;

  return (
    <Card py="1" maxW="md">
      <PostCardHeader
        portfolioData={portfolioData}
        isLink={linkOptions?.header}
        isUserPost={isUserPost}
      />
      <PostCardBody portfolioData={portfolioData} isLink={linkOptions?.body} />
      <PostCardFooter portfolioData={portfolioData} />
    </Card>
  );
};

export default PostCard;
