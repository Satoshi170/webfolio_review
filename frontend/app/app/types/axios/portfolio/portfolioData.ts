import { CommentData } from "./comment/comment";
import { UserData } from "../../auth";

interface Good {
  userId: number;
}

export interface PortfolioData {
  id: number;
  title: string;
  content: string;
  updatedAt: Date;
  user: UserData;
  goods: Good[];
  comments: CommentData[];
}
