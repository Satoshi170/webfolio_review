"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text
} from "@chakra-ui/react";
import Linkify from "linkify-react";
import NextLink from "next/link";
import { BiLike } from "react-icons/bi";
import { useRecoilValue } from "recoil";

import RenderLink from "@/app/libs/linkify/RenderLink";
import { loginState } from "@/app/stores/atoms/loginState";
import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

import UserIcon from "../../atoms/user/UserIcon";
import OptionPostMenuButton from "../../molecules/actionButtons/post/OptionMenuButton";

interface Props {
  portfolioData: PortfolioData;
  isLink?: boolean;
}

const PostCard: React.FC<Props> = ({ portfolioData, isLink = false }) => {
  const { id, title, content, updatedAt, user } = portfolioData;
  const { isLogin, data } = useRecoilValue(loginState);
  const isUserPost = isLogin ? data.id == user.id : false;

  return (
    <Card py="1" w="md">
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <UserIcon image={user.image} name={user.name} diameter={39} />
            <Heading fontSize="md">{user.name}</Heading>
          </Flex>
          {isUserPost && <OptionPostMenuButton portfolioData={portfolioData} />}
        </Flex>
      </CardHeader>
      <CardBody
        py="1"
        as={isLink ? NextLink : undefined}
        href={isLink ? `/post/${id}` : undefined}
      >
        <Heading fontSize="xl">{title}</Heading>
        <Text fontSize="md" mt="3">
          <Linkify options={{ render: RenderLink }}>{content}</Linkify>
        </Text>
      </CardBody>
      <CardFooter>
        <Stack w="full">
          <Divider />
          <Flex justifyContent="space-between">
            <Flex my="auto">
              <IconButton aria-label="Send Like" icon={<BiLike />} variant="ghost" />
            </Flex>
            <Text fontSize="sm" color="blackAlpha.500" my="auto">
              {updatedAt.toLocaleDateString()}
            </Text>
          </Flex>
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
