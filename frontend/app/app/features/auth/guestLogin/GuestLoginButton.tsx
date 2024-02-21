"use client";

import { Button } from "@chakra-ui/react";

import { useGuestLogin } from "./useGuestLogin";

const GuestLoginButton: React.FC = () => {
  const guestLogin = useGuestLogin();

  return (
    <Button onClick={guestLogin} colorScheme="gray" variant="link">
      ゲストとしてログインする
    </Button>
  );
};

export default GuestLoginButton;
