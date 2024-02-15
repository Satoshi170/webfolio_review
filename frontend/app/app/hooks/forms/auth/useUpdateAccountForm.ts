import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import {
  PatchAuthImageSchema,
  PatchAuthNonImageSchema
} from "@/app/libs/zod/formValidations/auth/patchAuthSchema";

import { usePatchAuthOperation } from "../../operations/auth/usePatchAuthOperation";

import type { PatchAuthParams } from "@/app/types/axios/auth/patchAuth";


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
    resolver: zodResolver(PatchAuthNonImageSchema),
    mode: "onChange"
  });

  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const patchAuthOperation = usePatchAuthOperation();

  const isValidatedImage = useCallback(
    (file: File) => {
      const result = PatchAuthImageSchema.safeParse({ image: file });
      if (!result.success) {
        setError("image", {
          message: result.error.errors[0].message,
          type: "manual"
        });
        return false;
      }
      return true;
    },
    [setError]
  );

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }

      const file = event.target.files[0];
      if (!file) {
        return;
      }

      clearErrors("image");
      if (isValidatedImage(file)) {
        setImageFile(file);
        setFileName(file.name);
        setValue("image", file);
      }
    },
    [clearErrors, isValidatedImage, setValue]
  );

  const resetImage = useCallback(() => {
    setImageFile(null);
    setValue("image", undefined);
    setFileName("");
  }, [setValue]);

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

    if (Object.keys(params).length === 0) {
      setIsLoading(false);
      return;
    }

    try {
      await patchAuthOperation(params);
      reset();
      setImageFile(null);
      setFileName("");
    } finally {
      setIsLoading(false);
    }
  };

  const watchedName = watch("name");

  const isFormValid = useMemo(() => {
    return !(errors.name || errors.image) && !!(watchedName || imageFile);
  }, [errors, imageFile, watchedName]);

  return {
    register,
    handleSubmit,
    getValues,
    setValue,
    errors,
    isLoading,
    imageFile,
    handleImageChange,
    resetImage,
    onSubmit,
    fileName,
    setFileName,
    isFormValid,
    setError
  };
};
