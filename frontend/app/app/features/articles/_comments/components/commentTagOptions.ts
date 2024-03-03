import { candidateTagData } from "../datas/tags";

import type { MapSelectOptions, SelectOption } from "@/app/components/molecules/fields";

const commentTagMappingOptions: MapSelectOptions<typeof candidateTagData> = {
  "bug report": {
    label: "bug report",
    value: candidateTagData["bug report"].toString(),
    colorScheme: "red"
  },
  suggestion: {
    label: "suggestion",
    value: candidateTagData.suggestion.toString(),
    colorScheme: "blue"
  }
};

export const commentTagOptions: SelectOption[] = Object.values(commentTagMappingOptions);
