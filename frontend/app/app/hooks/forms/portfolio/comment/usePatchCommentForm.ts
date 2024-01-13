import { useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { equals, identity, sortBy } from "ramda";
import { FormEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { patchPortfoliosByIdComments } from "@/app/libs/axios/portfolio/comment/patchPortfoliosByIdCommentsById";
import { PortfolioCommentSchema } from "@/app/libs/zod/formValidations/portfolio/portfolioCommentSchema";
import {
  CommentData,
  PostCommentFormParams,
  PostCommentParams
} from "@/app/types/axios/portfolio/comment/comment";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

export const usePatchCommentForm = (portfolioId: number, commentData: CommentData) => {
  const defaultTagIdsValue = commentData.tags.map((item) => ({
    value: String(item.id),
    label: item.name
  }));

  const defaultTagIds = commentData.tags.map((item) => String(item.id));

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid }
  } = useForm<PostCommentFormParams>({
    resolver: zodResolver(PortfolioCommentSchema),
    mode: "onChange",
    defaultValues: { content: commentData.content, tagIds: defaultTagIds }
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { setSuccessToast, setErrorToast } = useSetToastState();

  const isChange = () => {
    const isContentChanged = !(watch("content") == commentData.content);
    const isTagIdsChanged = (() => {
      const watchedTagIds = watch("tagIds") || [];
      const sortedWatchTagIds = sortBy(identity, watchedTagIds);

      return !equals(sortedWatchTagIds, defaultTagIds);
    })();

    return isContentChanged || isTagIdsChanged;
  };

  const isFormValid = isChange() && isValid;

  const onSubmit = useCallback(
    async (params: PostCommentFormParams) => {
      setIsLoading(true);
      const transformedParamsByZod = params as unknown as PostCommentParams;
      try {
        await patchPortfoliosByIdComments(
        portfolioId,
        commentData.id,
        transformedParamsByZod
      );
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
    control,
    defaultTagIdsValue,
    errors,
    isLoading,
    isFormValid,
    handleFormSubmit,
    isOpen,
    onOpen,
    onClose
  };
};
