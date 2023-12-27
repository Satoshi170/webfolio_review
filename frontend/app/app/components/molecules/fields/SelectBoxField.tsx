"use client";

import { FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";
import Select from "react-select";

import RequiredAsterisk from "../../atoms/RequiredAsterisk";

interface Option {
  value: string;
  label: string;
}

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  options: Option[];
  isMulti?: true;
  isRequired?: true;
  error?: FieldError;
  control: Control<T>;
  defaultValue?: Option[];
}

const SelectBoxField = <T extends FieldValues>({
  name,
  label,
  isRequired = undefined,
  isMulti = undefined,
  control,
  options,
  error,
  defaultValue = undefined
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <FormLabel>
            {label}
            {isRequired && <RequiredAsterisk />}
          </FormLabel>
          <Select
            options={options}
            isMulti={isMulti}
            isSearchable
            defaultValue={defaultValue}
            value={options.find((item) => item.value === field.value)}
            onChange={(newVal) => {
              field.onChange(newVal.map((item) => item.value));
            }}
          />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </>
      )}
    ></Controller>
  );
};

export default SelectBoxField;
