import { useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { patchPortfoliosByIdComments } from "@/app/libs/axios/portfolio/comment/patchPortfoliosByIdCommentsById";
import { PortfolioCommentSchema } from "@/app/libs/zod/formValidations/portfolio/portfolioCommentSchema";
import { CommentData, CommentParams } from "@/app/types/axios/portfolio/comment/comment";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

export const usePatchCommentForm = (portfolioId: number, commentData: CommentData) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<CommentParams>({
    resolver: zodResolver(PortfolioCommentSchema),
    mode: "onChange",
    defaultValues: { content: commentData.content }
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { setSuccessToast, setErrorToast } = useSetToastState();

  const isChange = !(watch("content") == commentData.content);
  const isFormValid = isChange && isValid;

  const onSubmit = useCallback(
    async (params: CommentParams) => {
      setIsLoading(true);
      try {
        await patchPortfoliosByIdComments(portfolioId, commentData.id, params);
        setSuccessToast("コメントの更新に成功しました");
      } catch (e) {
        const errorMessage = resolveErrorMessage(e);
        setErrorToast(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [commentData.id, portfolioId, setErrorToast, setSuccessToast]
  );

  const formSubmit = handleSubmit(onSubmit);
  const handleFormSubmit = useCallback(
    async (e: FormEvent) => {
      await formSubmit(e);
      onClose();
      window.location.reload();
    },
    [formSubmit, onClose]
  );

  return {
    register,
    errors,
    isLoading,
    isFormValid,
    handleFormSubmit,
    isOpen,
    onOpen,
    onClose
  };
};
