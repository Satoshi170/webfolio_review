import CustomLink from "./CustomLink";

import type { IntermediateRepresentation } from "linkifyjs";

const RenderLink = (ir: IntermediateRepresentation): JSX.Element => {
  return <CustomLink {...ir.attributes}>{ir.content}</CustomLink>;
};

export default RenderLink;
