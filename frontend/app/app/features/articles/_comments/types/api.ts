export interface CommentParams {
  content: string;
  tagIds?: number[];
}

export interface CommentFormParams extends Omit<CommentParams, "tagIds"> {
  tagIds: string[];
}
