"use client";

import { FormControl, FormErrorMessage, FormLabel, Textarea } from "@chakra-ui/react";
import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

import RequiredAsterisk from "../../atoms/RequiredAsterisk";

export interface TextareaFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  isRequired?: boolean;
  register: UseFormRegister<T>;
  error?: FieldError;
}

const TextareaField = <T extends FieldValues>({
  name,
  label,
  isRequired = false,
  register,
  error
}: TextareaFieldProps<T>) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>
        {label}
        {isRequired && <RequiredAsterisk />}
      </FormLabel>
      <Textarea id={name as string} {...register(name)} h="200px"></Textarea>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default TextareaField;
