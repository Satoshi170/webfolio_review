import { validUserData } from "../auth/validUserData";

import type { ArticleData } from "@/app/features/articles/types/articleData";

export const validArticleData: ArticleData = {
  id: 1,
  title: "testTitle",
  content: "testContent",
  operationStatus: "active",
  portfolioSiteUrl: "http://example.cpm",
  repositoryUrl: "http://example.com",
  totalLikes: 3,
  updatedAt: new Date(),
  user: validUserData,
  comments: [
    {
      id: 1,
      content: "testComment",
      updatedAt: new Date(),
      tags: [],
      user: validUserData
    }
  ]
};
