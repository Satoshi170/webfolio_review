"use client";

import SubmitFullWideButton from "@/app/components/atoms/buttons/SubmitFullWideButton";
import InputField from "@/app/components/molecules/fields/InputField";

import { useSignUpForm } from "./useSignUpForm";

const SignUpForm: React.FC = () => {
  const { register, handleSubmit, errors, isValid, onSubmit, isLoading } =
    useSignUpForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        name="name"
        label="ユーザー名"
        isRequired={true}
        register={register}
        error={errors.name}
      />
      <InputField
        name="email"
        label="メールアドレス"
        isRequired={true}
        register={register}
        error={errors.email}
      />
      <InputField
        name="password"
        label="パスワード"
        type="password"
        isRequired={true}
        register={register}
        error={errors.password}
      />
      <InputField
        name="passwordConfirmation"
        label="パスワード(再確認)"
        type="password"
        isRequired={true}
        register={register}
        error={errors.passwordConfirmation}
      />
      <SubmitFullWideButton text="登録する" isLoading={isLoading} isDisabled={!isValid} />
    </form>
  );
};

export default SignUpForm;
