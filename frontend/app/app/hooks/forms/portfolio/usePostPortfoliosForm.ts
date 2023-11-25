import { useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { postPortfolios } from "@/app/libs/axios/portfolio/postPortfolios";
import { PortfolioSchema } from "@/app/libs/zod/formValidations/portfolio/portfolioSchema";
import { toastState } from "@/app/stores/atoms/toastState";
import { PostPortfoliosParams } from "@/app/types/axios/portfolio/postPortfolios";

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
  const [isLoading, setIsLoading] = useState(false);
  const setToast = useSetRecoilState(toastState);

  const onSubmit = async (params: PostPortfoliosParams) => {
    setIsLoading(true);
    try {
      await postPortfolios(params);
      setToast({
        message: "投稿に成功しました",
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
