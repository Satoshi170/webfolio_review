import { useState } from "react";

import { useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { candidateOperationStatusData } from "@/app/constants/datas/portfolios/operationStatuses";
import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { ArticleSchema } from "./articleSchema";
import { patchArticle } from "../api/patchArticle";

import type { PatchArticleParams } from "../types/api/patchArticle";
import type { ArticleData } from "../types/articleData";
import type { FormEvent } from "react";

export const useUpdateArticleForm = (articleData: ArticleData) => {
  const defaultOperationStatusValue =
    candidateOperationStatusData[articleData.operationStatus].toString();
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(ArticleSchema),
    mode: "onChange",
    defaultValues: {
      title: articleData.title,
      content: articleData.content,
      operationStatus: defaultOperationStatusValue,
      portfolioSiteUrl: articleData.portfolioSiteUrl,
      repositoryUrl: articleData.repositoryUrl
    }
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setSuccessToast, setErrorToast } = useSetToastState();
  const [isLoading, setIsLoading] = useState(false);

  const isChange = !(
    watch("title") == articleData.title &&
    watch("content") == articleData.content &&
    watch("operationStatus") == defaultOperationStatusValue &&
    watch("portfolioSiteUrl") == articleData.portfolioSiteUrl &&
    watch("repositoryUrl") == articleData.repositoryUrl
  );

  const isFormValid = isChange && isValid;

  const onSubmit = async (params: PatchArticleParams) => {
    setIsLoading(true);
    try {
      await patchArticle(articleData.id, params);
      setSuccessToast("更新に成功しました");
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
    onClose();
    window.location.reload();
  };

  return {
    control,
    register,
    errors,
    isFormValid,
    onSubmit,
    handleFormSubmit,
    isLoading,
    isOpen,
    onOpen,
    onClose
  };
};