"use client";

import { Link } from "@chakra-ui/next-js";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import NextLink from "next/link";

import GuestLoginButton from "../../organisms/apiActionButtons/auth/GuestLoginButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SignInAlertModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>サインインしてください</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              <Link as={NextLink} href="/auth/sign_in" color="blue">
                こちら
              </Link>
              からサインインしてください
            </Text>
            <Text>
              または
              <GuestLoginButton />
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>閉じる</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignInAlertModal;
