"use client";

import NextLink from "next/link";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Icon,
  Text
} from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";

import UpdatedDateText from "@/app/components/atoms/texts/UpdatedDateText";
import UserIcon from "@/app/components/atoms/users/UserIcon";

import type { ArticleData } from "../../types/articleData";

interface Props {
  articleData: ArticleData;
}

const ArticleCard: React.FC<Props> = ({ articleData }) => {
  const { id, title, updatedAt, user, goods } = articleData;

  return (
    <Card w="full" h="auto" as={NextLink} href={`/articles/${id}`}>
      <CardHeader>
        <Flex flex="1" gap="2" alignItems="center">
          <UserIcon image={user.image} name={user.name} diameter={30} />
          <Heading fontSize="md">{user.name}</Heading>
        </Flex>
      </CardHeader>
      <CardBody>
        <Heading fontSize="lg">{title}</Heading>
      </CardBody>
      <CardFooter alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" color="blackAlpha.500" gap="1">
          <Icon as={AiOutlineHeart} />
          <Text>{goods.length}</Text>
        </Flex>
        <UpdatedDateText date={updatedAt} />
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
