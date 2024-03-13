import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { candidateOperationStatusData } from "@/app/constants/datas/portfolios/operationStatuses";
import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { ArticleSchema } from "./articleSchema";
import { useGetArticle } from "./useGetArticle";
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
    reset,
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
  const { setSuccessToast, setErrorToast } = useSetToastState();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useGetArticle(articleData.id);

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
      const response = await patchArticle(articleData.id, params);
      await mutate(response);
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
  };

  return {
    control,
    register,
    errors,
    isFormValid,
    onSubmit,
    reset,
    handleFormSubmit,
    isLoading
  };
};
