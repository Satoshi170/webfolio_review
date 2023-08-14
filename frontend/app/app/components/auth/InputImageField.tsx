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
type HandleImageChangeType = (event: React.ChangeEvent<HTMLInputElement>) => File | null;

export type InputImageFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  error?: FieldError;
  register: UseFormRegister<T>;
  onChange: HandleImageChangeType;
  resetImage: () => void;
  fileName: string | null;
};

const InputImageField = <T extends FieldValues>({
  name,
  label,
  error,
  register,
  onChange,
  resetImage,
  fileName
}: InputImageFieldProps<T>) => {
  const { fileInput, triggerFileSelect } = useInputImageField();
  const { ref, ...rest } = register(name);

  return (
    <FormControl isInvalid={!!error}>
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
