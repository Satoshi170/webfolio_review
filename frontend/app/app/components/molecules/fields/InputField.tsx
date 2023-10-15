"use client";

import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

import RequiredAsterisk from "../../atoms/RequiredAsterisk";

export interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  isRequired?: boolean;
  type?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const InputField = <T extends FieldValues>({
  name,
  label,
  isRequired = false,
  type = "text",
  register,
  error
}: InputFieldProps<T>) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name as string}>
        {label}
        {isRequired && <RequiredAsterisk />}
      </FormLabel>
      <Input type={type} id={name as string} {...register(name)} />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
