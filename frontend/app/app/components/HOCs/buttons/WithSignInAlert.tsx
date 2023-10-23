"use client";

import { useDisclosure } from "@chakra-ui/react";
import { ComponentType } from "react";
import { useRecoilValue } from "recoil";

import { loginState } from "@/app/stores/atoms/loginState";

import SignInAlertModal from "../../atoms/auth/SignInAlertModal";

interface WithOnClick {
  onClick: () => void;
}

const WithSignInAlert = <P extends WithOnClick>(
  WrappedButtonComponent: ComponentType<P>
): React.FC<P> => {
  const AlertIfLoggedOut: React.FC<P> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isLogin } = useRecoilValue(loginState);
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
