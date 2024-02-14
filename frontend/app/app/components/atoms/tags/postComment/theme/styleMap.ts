import { candidateTagData } from "@/app/constants/datas/portfolios/comments/tags";

import { MapTagColors } from "./type";

export const postCommentTagStyles: MapTagColors<typeof candidateTagData> = {
  "bug report": { label: "bug report", colorTheme: "red" },
  suggestion: { label: "suggestion", colorTheme: "blue" }
};
