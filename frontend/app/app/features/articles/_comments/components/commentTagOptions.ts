import { candidateTagData } from "../datas/tags";

import type {
  MapOptions,
  Option
} from "@/app/components/molecules/fields/SelectBoxField/types";

const commentTagMappingOptions: MapOptions<typeof candidateTagData> = {
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

export const commentTagOptions: Option[] = Object.values(commentTagMappingOptions);
