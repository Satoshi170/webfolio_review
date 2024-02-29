"use client";

import { FormControl, FormErrorMessage, FormLabel, Textarea } from "@chakra-ui/react";

import type { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface TextareaFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  isRequired?: boolean;
}

const TextareaField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  register,
  error,
  isRequired = false
}: TextareaFieldProps<T>) => {
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && <FormLabel htmlFor={name as string}>{label}</FormLabel>}
      <Textarea
        id={name as string}
        {...register(name)}
        h="200px"
        placeholder={placeholder}
      ></Textarea>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default TextareaField;
