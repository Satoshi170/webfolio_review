import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ImageFileSchema, PatchAuthSchema } from "@/app/libs/zod/auth/patchAuthSchema";
import { PatchAuthParams } from "@/app/types/axios/auth/patchAuth";

import { usePatchAuthSubmit } from "../../submits/auth/usePatchAuthSubmit";

export const useUpdateAccountForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    watch,
    reset,
    formState: { errors }
  } = useForm<PatchAuthParams>({
    resolver: zodResolver(PatchAuthSchema),
    mode: "onChange"
  });

  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const patchAuthSubmit = usePatchAuthSubmit();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): File | null => {
    if (!event.target.files) {
      return null;
    }

    const file = event.target.files[0];
    if (!file) {
      return null;
    }

    clearErrors("image");
    if (validateImage(file)) {
      setImageFile(file);
      setFileName(file.name);
      setValue("image", file);
      return file;
    }

    return null;
  };

  const resetImage = () => {
    setImageFile(null);
    setValue("image", undefined);
    setFileName("");
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const values = getValues();
    const params: PatchAuthParams = {};

    if (values.name) {
      params.name = values.name;
    }

    if (imageFile) {
      params.image = imageFile;
    }

    try {
      await patchAuthSubmit(params);
      reset();
      setImageFile(null);
      setFileName("");
    } finally {
      setIsLoading(false);
    }
  };

  const validateImage = (file: File) => {
    const result = ImageFileSchema.safeParse({ file: file });
    if (!result.success) {
      setError("image", {
        message: result.error.errors[0].message,
        type: "manual"
      });
      return false;
    }
    return true;
  };

  const isFormValid = () => {
    const watchedName = watch("name");
    return !(errors.name || errors.image) && !!(watchedName || imageFile);
  };

  return {
    register,
    handleSubmit,
    getValues,
    errors,
    isLoading,
    imageFile,
    handleImageChange,
    resetImage,
    onSubmit,
    fileName,
    setFileName,
    isFormValid
  };
};
