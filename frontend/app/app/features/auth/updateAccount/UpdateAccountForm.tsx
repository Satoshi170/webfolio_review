"use client";

import { Spacer, Text } from "@chakra-ui/react";

import SubmitFullWideButton from "@/app/components/atoms/SubmitFullWideButton";
import InputField from "@/app/components/molecules/fields/InputField";
import InputImageField from "@/app/components/molecules/fields/InputImageField";

import { useUpdateAccountForm } from "./useUpdateAccountForm";

interface Props {
  userName: string;
  isGuestUser: boolean;
}

const UpdateAccountForm: React.FC<Props> = ({ userName, isGuestUser }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    handleImageChange,
    resetImage,
    fileName,
    isFormValid
  } = useUpdateAccountForm();

  const isDisabled = isGuestUser || !isFormValid;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text>現在のユーザー名: {userName}</Text>
      <InputField
        name="name"
        label="新しいユーザー名"
        register={register}
        error={errors.name}
      />
      <Spacer my="2" />
      <InputImageField
        name="image"
        label="新しいユーザー画像"
        register={register}
        error={errors.image}
        onChange={handleImageChange}
        resetImage={resetImage}
        fileName={fileName}
      />
      <SubmitFullWideButton
        text="更新する"
        isLoading={isLoading}
        isDisabled={isDisabled}
      />
    </form>
  );
};

export default UpdateAccountForm;
