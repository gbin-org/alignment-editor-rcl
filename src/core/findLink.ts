import { Link } from "../components/link";
import { TextSegment } from "../components/textSegment"

export const findLinkForTextSegment = (
  links: Link[],
  textSegment: TextSegment
): Link | undefined => {
  const found = links.find((link: Link): boolean => {
    if (textSegment.type === "source") {
      return link.sources.includes(textSegment.position);
    }

    if (textSegment.type === "target") {
      return link.targets.includes(textSegment.position);
    }

    return false;
  });

  return found;
};
