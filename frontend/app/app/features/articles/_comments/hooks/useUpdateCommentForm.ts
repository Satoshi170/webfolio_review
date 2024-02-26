import { useCallback, useState } from "react";

import { useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { equals, identity, sortBy } from "ramda";
import { useForm } from "react-hook-form";

import { useSetToastState } from "@/app/hooks/recoil/toastState/useSetToastState";
import { resolveErrorMessage } from "@/app/utils/resolveErrorMessage";

import { CommentSchema } from "./commentSchema";
import { patchArticleComment } from "../api/patchArticleComment";
import { candidateTagData } from "../datas/tags";

import type { CommentData } from "../types";
import type { CommentFormParams, CommentParams } from "../types/api";
import type { FormEvent } from "react";

export const useUpdateCommentForm = (articleId: number, commentData: CommentData) => {
  const defaultTagIds = commentData.tags.map((item) => candidateTagData[item].toString());
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid }
  } = useForm<CommentFormParams>({
    resolver: zodResolver(CommentSchema),
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
    async (params: CommentFormParams) => {
      setIsLoading(true);
      const transformedParamsByZod = params as unknown as CommentParams;
      try {
        await patchArticleComment(articleId, commentData.id, transformedParamsByZod);
        setSuccessToast("コメントの更新に成功しました");
      } catch (e) {
        const errorMessage = resolveErrorMessage(e);
        setErrorToast(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [commentData.id, articleId, setErrorToast, setSuccessToast]
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
    errors,
    isLoading,
    isFormValid,
    handleFormSubmit,
    isOpen,
    onOpen,
    onClose
  };
};
