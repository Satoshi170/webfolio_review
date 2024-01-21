"use client";

import { Box, HStack, Heading, SkeletonText, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

import { useGetURLMetaData } from "@/app/hooks/swr/useGetMetaData";

import LinkCardImage from "../molecules/linkCards/LinkCardImage";
import LinkCardURLText from "../molecules/linkCards/LinkCardURLText";

interface MetaDataLinkCardProps {
  url: string;
}

const LinkCardWithMetaData: React.FC<MetaDataLinkCardProps> = ({ url }) => {
  const { data, error, isLoading } = useGetURLMetaData(url);

  if (error || !data || !data.title) return <Link href={url}>{url}</Link>;

  const { title, description, image, favicon } = data;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      w={{ base: "auto", lg: "lg" }}
      h="6.575rem"
    >
      <HStack
        h="full"
        as="a"
        href={url}
        rel="noreferrer noopener nofollow"
        target="_blank"
      >
        <LinkCardImage image={image} url={url} isLoading={isLoading} />
        <VStack w="70%">
          <SkeletonText noOfLines={5} isLoaded={!isLoading} p="1">
            <Heading fontSize="md" noOfLines={1} mb="1">
              {title}
            </Heading>
            {description && (
              <Text fontSize="xs" color="blackAlpha.600" noOfLines={2} mb="1">
                {description}
              </Text>
            )}
            <LinkCardURLText favicon={favicon} url={url} />
          </SkeletonText>
        </VStack>
      </HStack>
    </Box>
  );
};

export default LinkCardWithMetaData;
