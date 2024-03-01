"use client";

import { Link } from "@chakra-ui/react";

import type { LinkProps } from "@chakra-ui/react";

const CustomLink = (props: LinkProps): JSX.Element => {
  const { href, children, ...other } = props;

  return (
    <Link {...other} href={href} target="_blank" rel="noopener noreferrer" color="blue">
      {children}
    </Link>
  );
};

export default CustomLink;
