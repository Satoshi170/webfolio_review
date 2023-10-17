"use client";

import { Link } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface Props {
  text?: string;
}
const GoBackLink: React.FC<Props> = ({ text = "戻る" }) => {
  const router = useRouter();

  return (
    <Link as="button" onClick={() => router.back()} color="blue">
      ←{text}
    </Link>
  );
};

export default GoBackLink;
