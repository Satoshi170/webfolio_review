import { IntermediateRepresentation } from "linkifyjs";

import CustomLink from "@/app/components/atoms/CustomLink";

const RenderLink = (ir: IntermediateRepresentation): JSX.Element => {
  return <CustomLink {...ir.attributes}>{ir.content}</CustomLink>;
};

export default RenderLink;
