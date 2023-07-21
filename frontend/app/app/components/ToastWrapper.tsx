"use client";

import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

import { toastState } from "@/app/stores/atoms/toastState";

const ToastWrapper: React.FC = () => {
  const toast = useToast();
  const { status, message } = useRecoilValue(toastState);

  useEffect(() => {
    if (message) {
      toast({
        description: message,
        status,
        duration: 20000,
        isClosable: true
      });
    }
  }, [message, status, toast]);

  return null;
};

export default ToastWrapper;
