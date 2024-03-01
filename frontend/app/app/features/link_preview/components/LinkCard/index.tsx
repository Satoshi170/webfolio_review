"use client";

import Link from "next/link";

import { Heading, LinkBox, LinkOverlay, Stack, Text } from "@chakra-ui/react";

import LinkCardImage from "./sections/LinkCardImage";
import LinkCardURLText from "./sections/LinkCardURLText";
import { useGetURLMetaData } from "../../hooks/useGetMetaData";

interface MetaDataLinkCardProps {
  url: string;
}

const LinkCardWithMetaData: React.FC<MetaDataLinkCardProps> = ({ url }) => {
  const { URLMetaData, error, isLoading } = useGetURLMetaData(url);

  if (isLoading || error || !URLMetaData || !URLMetaData.title)
    return <Link href={url}>{url}</Link>;

  const { title, description, image, favicon } = URLMetaData;

  return (
    <LinkBox
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      w={{ base: "auto", xl: "xl" }}
      h="7rem"
      display="flex"
      as="article"
    >
      <LinkCardImage image={image} url={url} />
      <Stack p="1">
        <Heading size="sm" noOfLines={1} m="1">
          <LinkOverlay href={url} rel="noreferrer noopener nofollow" target="_blank">
            {title}
          </LinkOverlay>
        </Heading>
        {description && (
          <Text fontSize="xs" color="blackAlpha.600" noOfLines={2} mb="1">
            {description}
          </Text>
        )}
        <LinkCardURLText favicon={favicon} url={url} />
      </Stack>
    </LinkBox>
  );
};

export default LinkCardWithMetaData;
