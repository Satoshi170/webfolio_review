import { useState } from "react";

import { useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";

import { CommentSchema } from "./commentSchema";
import { postArticleComment } from "../api/postArticleComment";

import type { CommentParams } from "../types/api";
import type { FormEvent } from "react";

export const useCreateCommentForm = (id: number) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid }
  } = useForm<CommentParams>({
    resolver: zodResolver(CommentSchema),
    mode: "onChange",
    defaultValues: { tagIds: [] }
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { setSuccessToast, setErrorToast } = useSetToastState();

  const onSubmit = async (params: CommentParams) => {
    setIsLoading(true);
    try {
      await postArticleComment(id, params);
      setSuccessToast("コメントの作成に成功しました");
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : UNEXPECTED_ERROR_MESSAGE;
      setErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formSubmit = handleSubmit(onSubmit);
  const handleFormSubmit = async (e: FormEvent) => {
    await formSubmit(e);
    onClose();
    window.location.reload();
  };

  return {
    register,
    control,
    errors,
    isLoading,
    isValid,
    onSubmit,
    handleFormSubmit,
    isOpen,
    onOpen,
    onClose
  };
};
