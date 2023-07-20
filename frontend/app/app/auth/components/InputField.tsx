import { FormControl, FormErrorMessage, FormLabel, Input, Text } from "@chakra-ui/react";
import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
};

const InputField = <T extends FieldValues>({
  name,
  label,
  register,
  error
}: InputFieldProps<T>) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name as string}>
        {label}
        <Text as="span" color="red.500">
          *
        </Text>
      </FormLabel>
      <Input id={name as string} {...register(name)} />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
