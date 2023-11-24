import { useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { patchPortfoliosByIdComments } from "@/app/libs/axios/portfolio/comment/patchPortfoliosByIdCommentsById";
import { PortfolioCommentSchema } from "@/app/libs/zod/formValidations/portfolio/portfolioCommentSchema";
import { toastState } from "@/app/stores/atoms/toastState";
import { CommentData, CommentParams } from "@/app/types/axios/portfolio/comment/comment";

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
  const setToast = useSetRecoilState(toastState);

  const isChange = !(watch("content") == commentData.content);
  const isFormValid = isChange && isValid;

  const onSubmit = async (params: CommentParams) => {
    setIsLoading(true);
    try {
      await patchPortfoliosByIdComments(portfolioId, commentData.id, params);
      setToast({
        message: "コメントの更新に成功しました",
        status: "success",
        timestamp: Date.now()
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : UNEXPECTED_ERROR_MESSAGE;
      setToast({
        message: errorMessage,
        status: "error",
        timestamp: Date.now()
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formSubmit = handleSubmit(onSubmit);
  const handleFormSubmit = async (e: FormEvent) => {
    console.log(commentData);
    await formSubmit(e);
    onClose();
    // window.location.reload();
  };

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
