"use client";

import { Heading, Spacer, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

import { useUpdateAccountForm } from "@/app/hooks/forms/auth/useUpdateAccountForm";
import { LoggedInState, loginState } from "@/app/stores/atoms/loginState";

import SubmitFullWideButton from "../../atoms/SubmitFullWideButton";
import InputField from "../../molecules/fields/InputField";
import InputImageField from "../../molecules/fields/InputImageField";
import RoundedCenteredBox from "../../styledWrappers/RoundedCenteredBox";

const AccountInformationTabPanel: React.FC = () => {
  const loginStateValue = useRecoilValue(loginState);
  const data = (loginStateValue as LoggedInState).userData;
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
  const isGuestUser = data.role == "guest";
  const isDisabled = isGuestUser || !isFormValid();

  return (
    <RoundedCenteredBox>
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
        <SubmitFullWideButton
          text="更新する"
          isLoading={isLoading}
          isDisabled={isDisabled}
        />
        {isGuestUser && (
          <>
            <Spacer my="4" />
            <Text color="red.500" fontSize="sm">
              ゲストユーザーはアカウント情報を更新できません
            </Text>
          </>
        )}
      </form>
    </RoundedCenteredBox>
  );
};

export default AccountInformationTabPanel;
