"use client";

import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import {
  GroupBase,
  MultiValue,
  OptionBase,
  Select,
  SingleValue
} from "chakra-react-select";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Merge,
  Path
} from "react-hook-form";

import { getErrorMessageForMultiSelect } from "@/app/utils/getErrorMessageForMultiSelectBox";
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
          <FormLabel>{label}</FormLabel>
          <Select<Option, typeof isMulti, GroupBase<Option>>
            isMulti={isMulti}
            name={name}
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
