import { validUserData } from "../auth/validUserData";

import type { ArticleData } from "@/app/features/articles/types/articleData";

export const validArticleData: ArticleData = {
  id: 1,
  title: "testTitle",
  content: "testContent",
  operationStatus: "active",
  portfolioSiteUrl: "http://example.cpm",
  repositoryUrl: "http://example.com",
  updatedAt: new Date(),
  user: validUserData,
  goods: [{ userId: 1 }, { userId: 2 }, { userId: 3 }],
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