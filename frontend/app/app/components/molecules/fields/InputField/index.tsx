"use client";

import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

import type { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  type?: string;
  isRequired?: boolean;
}

export const InputField = <T extends FieldValues>({
  name,
  label,
  register,
  error,
  type = "text",
  isRequired = false
}: InputFieldProps<T>) => {
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel htmlFor={name as string}>{label}</FormLabel>
      <Input type={type} id={name as string} {...register(name)} />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};
