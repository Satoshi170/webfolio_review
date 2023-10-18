"use client";

import { Box, Heading, Spacer, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

import { useUpdateAccountForm } from "@/app/hooks/forms/auth/useUpdateAccountForm";
import { LoggedInState, loginState } from "@/app/stores/atoms/loginState";

import SubmitButton from "../../atoms/SubmitButton";
import InputField from "../../molecules/fields/InputField";
import InputImageField from "../../molecules/fields/InputImageField";

const AccountInformationTabPanel: React.FC = () => {
  const loginStateValue = useRecoilValue(loginState);
  const data = (loginStateValue as LoggedInState).data;
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

  return (
    <Box flex="1" m="auto" maxW="md" boxShadow="md" p="12" rounded="md">
      <Heading as="h2" textAlign="center" mb="4">
        アカウント情報
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text>現在のユーザー名: {data.name}</Text>
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
        <SubmitButton text="更新する" isLoading={isLoading} isDisabled={!isFormValid()} />
      </form>
    </Box>
  );
};

export default AccountInformationTabPanel;
