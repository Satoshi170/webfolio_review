import { useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { useSetToast } from "@/app/hooks/recoil/useSetToast";
import { postPortfoliosByIdComments } from "@/app/libs/axios/portfolio/comment/postPortfoliosByIdComments";
import { PortfolioCommentSchema } from "@/app/libs/zod/formValidations/portfolio/portfolioCommentSchema";
import { PostCommentParams } from "@/app/types/axios/portfolio/comment/comment";

export const usePostCommentForm = (id: number) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid }
  } = useForm<PostCommentParams>({
    resolver: zodResolver(PortfolioCommentSchema),
    mode: "onChange"
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { setSuccessToast, setErrorToast } = useSetToast();

  const onSubmit = async (params: PostCommentParams) => {
    setIsLoading(true);
    try {
      await postPortfoliosByIdComments(id, params);
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
