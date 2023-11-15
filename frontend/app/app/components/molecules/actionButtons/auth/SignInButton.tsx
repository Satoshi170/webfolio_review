"use client";

import BlueLinkButton from "@/app/components/atoms/BlueLinkButton";

const SignInButton: React.FC = () => {
  return <BlueLinkButton href="/auth_sign_in" text="サインイン" />;
};

export default SignInButton;
