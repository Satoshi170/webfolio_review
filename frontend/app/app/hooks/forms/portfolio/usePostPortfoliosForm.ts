import { useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";

import { postPortfolios } from "@/app/libs/axios/portfolio/postPortfolios";
import { PortfolioSchema } from "@/app/libs/zod/formValidations/portfolio/portfolioSchema";
import { PostPortfoliosParams } from "@/app/types/axios/portfolio/postPortfolios";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { useSetToastState } from "../../recoil/toastState/useSetToastState";

export const usePostPortfoliosForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<PostPortfoliosParams>({
    resolver: zodResolver(PortfolioSchema),
    mode: "onChange"
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setSuccessToast, setErrorToast } = useSetToastState();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (params: PostPortfoliosParams) => {
    setIsLoading(true);
    try {
      await postPortfolios(params);
      setSuccessToast("投稿に成功しました");
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
