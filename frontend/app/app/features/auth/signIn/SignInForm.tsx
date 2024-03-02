"use client";

import { SubmitFullWideButton } from "@/app/components/atoms/buttons";
import InputField from "@/app/components/molecules/fields/InputField";

import { useSignInForm } from "./useSignInForm";

const SignInForm: React.FC = () => {
  const { register, handleSubmit, errors, isValid, onSubmit, isLoading } =
    useSignInForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <SubmitFullWideButton text="ログイン" isLoading={isLoading} isDisabled={!isValid} />
    </form>
  );
};

export default SignInForm;
