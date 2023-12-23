export const getColorForTagId = (tagId: number): string => {
  switch (tagId) {
    case 1:
      return "red";
    default:
      return "blue";
  }
};
