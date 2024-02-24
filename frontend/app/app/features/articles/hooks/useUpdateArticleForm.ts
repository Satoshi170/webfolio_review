import { useState } from "react";

import { useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { candidateOperationStatusData } from "@/app/constants/datas/portfolios/operationStatuses";
import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { ArticleSchema } from "./articleSchema";
import { patchArticle } from "../api/patchArticle";

import type { PatchPortfoliosByIdParams } from "@/app/types/axios/portfolio/patchPortfoliosById";
import type { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";
import type { FormEvent } from "react";

export const useUpdateArticleForm = (portfolioData: PortfolioData) => {
  const defaultOperationStatusValue =
    candidateOperationStatusData[portfolioData.operationStatus].toString();
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
      title: portfolioData.title,
      content: portfolioData.content,
      operationStatus: defaultOperationStatusValue,
      portfolioSiteUrl: portfolioData.portfolioSiteUrl,
      repositoryUrl: portfolioData.repositoryUrl
    }
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setSuccessToast, setErrorToast } = useSetToastState();
  const [isLoading, setIsLoading] = useState(false);

  const isChange = !(
    watch("title") == portfolioData.title &&
    watch("content") == portfolioData.content &&
    watch("operationStatus") == defaultOperationStatusValue &&
    watch("portfolioSiteUrl") == portfolioData.portfolioSiteUrl &&
    watch("repositoryUrl") == portfolioData.repositoryUrl
  );

  const isFormValid = isChange && isValid;

  const onSubmit = async (params: PatchPortfoliosByIdParams) => {
    setIsLoading(true);
    try {
      await patchArticle(portfolioData.id, params);
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
