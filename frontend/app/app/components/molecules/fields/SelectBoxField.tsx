"use client";

import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import {
  Select
} from "chakra-react-select";
import {
  Controller
} from "react-hook-form";

import { getErrorMessageForMultiSelect } from "@/app/utils/getErrorMessageForMultiSelectBox";

import type {
  GroupBase,
  MultiValue,
  OptionBase,
  SingleValue
} from "chakra-react-select";
import type {
  Control,
  FieldError,
  FieldValues,
  Merge,
  Path
} from "react-hook-form";
interface Option extends OptionBase {
  label: string;
  value: string;
}

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  options: Option[];
  placeholder: string;
  control: Control<T>;
  error: Merge<FieldError, (FieldError | undefined)[]> | undefined;
  isMulti?: boolean;
  isRequired?: boolean;
}

const SelectBoxField = <T extends FieldValues>({
  name,
  label,
  options,
  placeholder,
  control,
  error,
  isRequired = false,
  isMulti = false
}: Props<T>) => {
  const errorMessage = getErrorMessageForMultiSelect(error);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, ref, value } }) => (
        <FormControl id={name} isRequired={isRequired} isInvalid={!!error}>
          <FormLabel htmlFor={name as string}>{label}</FormLabel>
          <Select<Option, typeof isMulti, GroupBase<Option>>
            isMulti={isMulti}
            name={name as string}
            options={options}
            placeholder={placeholder}
            onBlur={onBlur}
            ref={ref}
            value={
              isMulti
                ? options.filter((option) =>
                    Array.isArray(value)
                      ? (value as string[]).includes(option.value)
                      : false
                  )
                : options.find((option) => option.value === value)
            }
            onChange={
              isMulti
                ? (newValue) => {
                    const values = (newValue as MultiValue<Option>).map((x) => x.value);
                    onChange(values);
                  }
                : (newValue) => {
                    const value = (newValue as SingleValue<Option>)?.value;
                    onChange(value);
                  }
            }
            isSearchable
          />
          <FormErrorMessage>{errorMessage && errorMessage}</FormErrorMessage>
        </FormControl>
      )}
    ></Controller>
  );
};

export default SelectBoxField;
