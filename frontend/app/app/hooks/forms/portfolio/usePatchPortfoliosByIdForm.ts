import { useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";

import { patchPortfoliosById } from "@/app/libs/axios/portfolio/patchPortfoliosById";
import { PortfolioSchema } from "@/app/libs/zod/formValidations/portfolio/portfolioSchema";
import { PatchPortfoliosByIdParams } from "@/app/types/axios/portfolio/patchPortfoliosById";
import { PortfolioData } from "@/app/types/axios/portfolio/portfolioData";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { useSetToastState } from "../../recoil/toastState/useSetToastState";

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
  const { setSuccessToast, setErrorToast } = useSetToastState();
  const [isLoading, setIsLoading] = useState(false);

  const isChange = !(
    watch("title") == portfolioData.title && watch("content") == portfolioData.content
  );

  const isFormValid = isChange && isValid;

  const onSubmit = async (params: PatchPortfoliosByIdParams) => {
    setIsLoading(true);
    try {
      await patchPortfoliosById(portfolioData.id, params);
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
