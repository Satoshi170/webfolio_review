"use client";

import { Box, Divider, Heading, Link, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import NextLink from "next/link";
import { useForm } from "react-hook-form";

import InputField from "@/app/components/auth/InputField";
import SubmitButton from "@/app/components/auth/SubmitButton";
import { useSignInForm } from "@/app/hooks/auth/useSignInForm";
import { postAuthSignIn } from "@/app/libs/axios/auth/postAuthSignIn";
import { signInSchema } from "@/app/libs/zod/auth/signInSchema";
import { PostAuthSignInCredentials } from "@/app/types/axios/auth/postAuthSignIn";

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid }
  } = useForm<PostAuthSignInCredentials>({
    resolver: zodResolver(signInSchema),
    mode: "onChange"
  });

  const { onSubmit, isLoading } = useSignInForm(postAuthSignIn, "/", setError);

  return (
    <Box flex="1" m="auto" maxW="md" boxShadow="md" p="12" rounded="md">
      <Heading as="h2" textAlign="center" mb="4">
        ログイン
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="email"
          label="メールアドレス"
          register={register}
          error={errors.email}
        />
        <InputField
          name="password"
          label="パスワード"
          type="password"
          register={register}
          error={errors.password}
        />
        <SubmitButton text="ログイン" isLoading={isLoading} isDisabled={!isValid} />
        <Divider my="4" />
        <Text>
          初めてのご利用ですか？新規登録は
          <Link as={NextLink} href="/auth/sign_up" color="blue">
            こちら
          </Link>
        </Text>
      </form>
    </Box>
  );
};

export default SignIn;
