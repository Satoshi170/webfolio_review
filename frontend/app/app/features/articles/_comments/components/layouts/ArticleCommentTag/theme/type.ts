export interface TagStyle {
  label: string;
  colorTheme: string;
}

export type MapTagColors<T> = {
  [K in keyof T]: TagStyle;
};
