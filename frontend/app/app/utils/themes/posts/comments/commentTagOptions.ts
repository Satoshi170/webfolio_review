import { tagDatas } from "@/app/constants/datas/tags";
import tagStyles from "@/app/theme/commentTagStyles";

export const commentTagOptions = tagDatas.map((tagData) => {
  const colorScheme = tagStyles[tagData.name];
  return { value: String(tagData.tagId), label: tagData.name, colorScheme };
});
