"use client";

import { Box, Divider, Heading, Link, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import InputField from "@/app/components/auth/InputField";
import SubmitButton from "@/app/components/auth/SubmitButton";
import { signIn } from "@/app/libs/axios/auth/signIn";
import { signInSchema } from "@/app/libs/zod/auth/schemas";
import { SignInCredentials } from "@/app/types/auth";

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInCredentials>({
    resolver: zodResolver(signInSchema),
    mode: "onChange"
  });

  const onSubmit = (data: SignInCredentials) => {
    setLoading(true);
    signIn(data)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
        <SubmitButton text="ログイン" isLoading={loading} />
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
