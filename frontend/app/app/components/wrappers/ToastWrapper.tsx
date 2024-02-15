"use client";

import { useEffect, useRef } from "react";

import { useToast } from "@chakra-ui/react";

import { useGetToastState } from "@/app/hooks/recoil/toastState/useGetToastState";

const ToastWrapper: React.FC = () => {
  const toast = useToast();
  const { status, message, timestamp } = useGetToastState();
  const toastIdRef = useRef<string | number | undefined>(undefined);

  useEffect(() => {
    if (message) {
      if (toastIdRef.current !== undefined) {
        toast.close(toastIdRef.current);
      }
      toastIdRef.current = toast({
        description: message,
        status,
        duration: 10000,
        isClosable: true
      });
    }
  }, [message, status, timestamp, toast]);

  return null;
};

export default ToastWrapper;
