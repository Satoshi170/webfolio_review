"use client";

import { CardFooter, Divider, Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import { BiLike } from "react-icons/bi";

import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

interface Props {
  portfolioData: PortfolioData;
}

const PostCardFooter: React.FC<Props> = ({ portfolioData }) => {
  const { updatedAt } = portfolioData;

  return (
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
  );
};

export default PostCardFooter;
