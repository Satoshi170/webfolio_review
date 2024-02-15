import type { OptionBase } from "chakra-react-select";

export interface Option extends OptionBase {
  label: string;
  value: string;
}

export type MapOptions<T> = {
  [K in keyof T]: Option;
};
