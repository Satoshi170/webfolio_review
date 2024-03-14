"use client";

import { CardHeader, Flex, Heading } from "@chakra-ui/react";

import { useArticleData } from "@/app/features/articles/hooks/useArticleData";
import { useEditMode } from "@/app/hooks/useEditMode";
import { UserIcon } from "@/app/components/atoms";

import OptionArticleMenuButton from "../../OptionMenuButton";

interface Props {
  isUser: boolean;
}
const ArticleHeader: React.FC<Props> = ({ isUser }) => {
  const { user } = useArticleData();
  const { isEditMode } = useEditMode();

  return (
    <CardHeader as={Flex}>
      <Flex flex="1" gap="2" alignItems="center">
        <UserIcon image={user.image} name={user.name} diameter={30} />
        <Heading fontSize="md">{user.name}</Heading>
      </Flex>
      {isUser && !isEditMode && <OptionArticleMenuButton />}
    </CardHeader>
  );
};

export default ArticleHeader;
