"use client";

import { Image } from "@chakra-ui/next-js";

interface UserIconProps {
  image: string | null;
  name: string;
  diameter: number;
}
const UserIcon: React.FC<UserIconProps> = ({ image, name, diameter }) => {
  const img = image ? image : "/defaultUserImage.png";
  return (
    <Image
      src={img}
      alt={name}
      width={diameter}
      height={diameter}
      borderRadius="full"
      m="0"
    />
  );
};

export default UserIcon;
