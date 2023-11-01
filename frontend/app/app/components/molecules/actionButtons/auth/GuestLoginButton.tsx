"use client";

import { Button } from "@chakra-ui/react";

import { usePostAuthGuestSignInOperation } from "@/app/hooks/operations/auth/usePostAuthGuestSignInOperation";

const GuestLoginButton: React.FC = () => {
  const guestLogin = usePostAuthGuestSignInOperation();

  return (
    <Button onClick={guestLogin} colorScheme="gray" variant="link">
      ゲストとしてログインする
    </Button>
  );
};

export default GuestLoginButton;
