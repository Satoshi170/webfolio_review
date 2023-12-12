"use client";

import { Text } from "@chakra-ui/react";

interface Props {
  date: Date;
}
const UpdatedDateText: React.FC<Props> = ({ date }) => {
  return (
    <Text fontSize="sm" color="blackAlpha.500" my="auto">
      {date.toLocaleDateString()}
    </Text>
  );
};

export default UpdatedDateText;
