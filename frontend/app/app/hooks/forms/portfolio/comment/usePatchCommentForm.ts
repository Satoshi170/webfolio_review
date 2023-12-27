import { useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { equals, identity, sortBy } from "ramda";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { tagDatas } from "@/app/constants/datas/tags";
import { UNEXPECTED_ERROR_MESSAGE } from "@/app/constants/errors/Messages";
import { patchPortfoliosByIdComments } from "@/app/libs/axios/portfolio/comment/patchPortfoliosByIdCommentsById";
import { PortfolioCommentSchema } from "@/app/libs/zod/formValidations/portfolio/portfolioCommentSchema";
import { toastState } from "@/app/stores/atoms/toastState";
import {
  CommentData,
  PostCommentFormParams,
  PostCommentParams
} from "@/app/types/axios/portfolio/comment/comment";

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
  const setToast = useSetRecoilState(toastState);

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

  const onSubmit = async (params: PostCommentFormParams) => {
    setIsLoading(true);
    const transformedParamsByZod = params as unknown as PostCommentParams;
    try {
      await patchPortfoliosByIdComments(
        portfolioId,
        commentData.id,
        transformedParamsByZod
      );
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
    await formSubmit(e);
    onClose();
    // window.location.reload();
  };

  const tagOptions = tagDatas.map((item) => ({
    value: String(item.tagId),
    label: item.name
  }));

  return {
    register,
    control,
    defaultTagIdsValue,
    tagOptions,
    errors,
    isLoading,
    isFormValid,
    handleFormSubmit,
    isOpen,
    onOpen,
    onClose
  };
};
