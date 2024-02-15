import type { MapTagColors } from "./type";
import type { candidateTagData } from "@/app/constants/datas/portfolios/comments/tags";

export const postCommentTagStyles: MapTagColors<typeof candidateTagData> = {
  "bug report": { label: "bug report", colorTheme: "red" },
  suggestion: { label: "suggestion", colorTheme: "blue" }
};
