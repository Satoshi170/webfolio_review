import type { PostArticleParams } from "@/app/features/articles/types/api/postArticle";

export const validPostArticleData: PostArticleParams = {
  title: "testTitle",
  content: "testContent",
  operationStatus: "0",
  portfolioSiteUrl: "http://example.com",
  repositoryUrl: "http://example.com"
};
