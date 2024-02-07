"use client";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from "@chakra-ui/react";
import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { BiSolidCameraPlus } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

import useInputImageField from "@/app/hooks/forms/useInputImageField";
type HandleImageChangeType = (event: React.ChangeEvent<HTMLInputElement>) => void;

export interface InputImageFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  fileName: string | null;
  onChange: HandleImageChangeType;
  register: UseFormRegister<T>;
  resetImage: () => void;
  error?: FieldError;
  isRequired?: boolean;
}

const InputImageField = <T extends FieldValues>({
  name,
  label,
  error,
  register,
  onChange,
  resetImage,
  fileName,
  isRequired = false
}: InputImageFieldProps<T>) => {
  const { fileInput, triggerFileSelect } = useInputImageField();
  const { ref, ...rest } = register(name);

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel htmlFor={name as string}>{label}</FormLabel>
      <Button
        onClick={triggerFileSelect}
        leftIcon={<BiSolidCameraPlus />}
        colorScheme="gray"
      >
        ファイルを選択
      </Button>
      {fileName && (
        <Button onClick={resetImage} variant="link">
          <RxCross2 />
        </Button>
      )}
      <Input
        display="none"
        type="file"
        id={name as string}
        ref={(e) => {
          ref(e);
          fileInput.current = e;
        }}
        {...rest}
        onChange={onChange}
        accept="image/jpeg, image/png"
      />
      {fileName && <p>選択されたファイル: {fileName}</p>}
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default InputImageField;
