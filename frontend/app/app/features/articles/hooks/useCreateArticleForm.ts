import { useState } from "react";
import { useRouter } from "next/navigation";

import { useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { ArticleSchema } from "./articleSchema";
import { postArticle } from "../api/postArticle";

import type { PostArticleParams } from "../types/api/postArticle";
import type { ArticleData } from "../types/articleData";
import type { FormEvent } from "react";

export const useCreateArticleForm = () => {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<PostArticleParams>({
    resolver: zodResolver(ArticleSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      operationStatus: "0",
      portfolioSiteUrl: "",
      repositoryUrl: null
    }
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setSuccessToast, setErrorToast } = useSetToastState();

  const onSubmit = async (params: PostArticleParams) => {
    setIsLoading(true);
    try {
      const response = await postArticle(params);
      setSuccessToast("投稿に成功しました");

      const newArticleId = response.id;
      await mutate<ArticleData>(`/articles/${newArticleId}`, response, false);
      router.push(`/articles/${newArticleId}`);
    } catch (e) {
      const errorMessage = resolveErrorMessage(e);
      setErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formSubmit = handleSubmit(onSubmit);
  const handleFormSubmit = async (e: FormEvent) => {
    await formSubmit(e);
    reset();
    onClose();
  };

  return {
    control,
    register,
    errors,
    isValid,
    isLoading,
    onSubmit,
    handleFormSubmit,
    isOpen,
    onOpen,
    onClose
  };
};
