"use client";

import { HStack, Icon, Text } from "@chakra-ui/react";
import { GrStatusGoodSmall } from "react-icons/gr";

import type { ArticleData } from "../../types/articleData";

interface Props {
  value: ArticleData["operationStatus"];
}

const OperationStatusBadge: React.FC<Props> = ({ value }) => {
  let color;
  let label;
  switch (value) {
    case "active":
      color = "green";
      label = "稼働中";
      break;
    case "maintenance":
      color = "yellow";
      label = "メンテナンス中";
      break;
    case "inactive":
      color = "red";
      label = "サービス終了";
  }

  return (
    <HStack gap="0.5">
      <Icon as={GrStatusGoodSmall} color={color} boxSize="2.5" />
      <Text>{label}</Text>
    </HStack>
  );
};

export default OperationStatusBadge;
