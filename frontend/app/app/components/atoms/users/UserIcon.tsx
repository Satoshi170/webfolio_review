"use client";

import { Image } from "@chakra-ui/next-js";

interface UserIconProps {
  image: string;
  name: string;
  diameter: number;
}
const UserIcon: React.FC<UserIconProps> = ({ image, name, diameter }) => {
  return (
    image && (
      <Image
        src={image}
        alt={name}
        width={diameter}
        height={diameter}
        borderRadius="full"
        m="0"
      />
    )
  );
};

export default UserIcon;
