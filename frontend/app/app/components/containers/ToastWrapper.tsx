"use client";

import { useToast } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

import { toastState } from "@/app/stores/atoms/toastState";

const ToastWrapper: React.FC = () => {
  const toast = useToast();
  const { status, message, timestamp } = useRecoilValue(toastState);
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
