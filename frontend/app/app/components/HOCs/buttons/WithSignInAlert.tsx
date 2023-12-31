"use client";

import { useDisclosure } from "@chakra-ui/react";
import { ComponentType } from "react";

import { useGetLoginState } from "@/app/hooks/recoil/loginState/useGetLoginState";

import SignInAlertModal from "../../organisms/modals/auth/SignInAlertModal";

interface WithOnClick {
  onClick: () => void;
}

const WithSignInAlert = <P extends WithOnClick>(
  WrappedButtonComponent: ComponentType<P>
): React.FC<P> => {
  const AlertIfLoggedOut: React.FC<P> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isLogin } = useGetLoginState();
    const handleClick = (originalOnClick: () => void) => {
      isLogin ? originalOnClick() : onOpen();
    };

    return (
      <>
        <WrappedButtonComponent {...props} onClick={() => handleClick(props.onClick)} />
        {!isLogin && <SignInAlertModal isOpen={isOpen} onClose={onClose} />}
      </>
    );
  };

  return AlertIfLoggedOut;
};

export default WithSignInAlert;
