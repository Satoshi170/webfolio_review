"use client";

import { CardBody, Heading, Text } from "@chakra-ui/react";

import { useArticleData } from "@/app/features/articles/hooks/useArticleData";
import { useEditMode } from "@/app/features/articles/hooks/useEditMode";
import LinkCardWithMetaData from "@/app/features/link_preview/components/LinkCard";

import UpdateArticleForm from "../../../UpdateArticleForm";

const ArticleBody: React.FC = () => {
  const { title, content, portfolioSiteUrl, repositoryUrl } = useArticleData();
  const { isEditMode } = useEditMode();
  if (isEditMode) {
    return (
      <CardBody>
        <UpdateArticleForm />
      </CardBody>
    );
  }

  return (
    <CardBody>
      <Heading fontSize="lg" mb="3">
        {title}
      </Heading>
      <LinkCardWithMetaData url={portfolioSiteUrl} />
      <Text my="4">{content}</Text>
      {repositoryUrl && (
        <>
          <Text>リポジトリURL</Text>
          <LinkCardWithMetaData url={repositoryUrl} />
        </>
      )}
    </CardBody>
  );
};

export default ArticleBody;
