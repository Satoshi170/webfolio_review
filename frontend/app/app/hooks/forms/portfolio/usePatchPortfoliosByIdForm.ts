import { useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { patchPortfoliosById } from "@/app/libs/axios/portfolio/patchPortfoliosById";
import { PortfolioSchema } from "@/app/libs/zod/formValidations/portfolio/portfolioSchema";
import { toastState } from "@/app/stores/atoms/toastState";
import { PatchPortfoliosByIdParams } from "@/app/types/axios/portfolio/patchPortfoliosById";
import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";

export const usePatchPortfoliosByIdForm = (portfolioData: PortfolioData) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(PortfolioSchema),
    mode: "onChange",
    defaultValues: {
      title: portfolioData.title,
      content: portfolioData.content
    }
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const isChange = !(
    watch("title") == portfolioData.title && watch("content") == portfolioData.content
  );

  const isFormValid = isChange && isValid;

  const [isLoading, setIsLoading] = useState(false);
  const setToast = useSetRecoilState(toastState);

  const onSubmit = async (params: PatchPortfoliosByIdParams) => {
    setIsLoading(true);
    try {
      await patchPortfoliosById(portfolioData.id, params);
      setToast({
        message: "更新に成功しました",
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
    isFormValid,
    onSubmit,
    handleFormSubmit,
    isLoading,
    isOpen,
    onOpen,
    onClose
  };
};
