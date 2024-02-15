import CustomLink from "@/app/components/atoms/CustomLink";

import type { IntermediateRepresentation } from "linkifyjs";


const RenderLink = (ir: IntermediateRepresentation): JSX.Element => {
  return <CustomLink {...ir.attributes}>{ir.content}</CustomLink>;
};

export default RenderLink;
