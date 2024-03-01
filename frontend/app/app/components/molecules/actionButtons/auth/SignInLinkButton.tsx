"use client";

import BlueLinkButton from "@/app/components/atoms/links/BlueLinkButton";

const SignInLinkButton: React.FC = () => {
  return <BlueLinkButton href="/auth/sign_in" text="サインイン" />;
};

export default SignInLinkButton;
