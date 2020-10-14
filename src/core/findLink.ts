import { TextSegment, Link } from 'core/structs';

export const findLinkForTextSegment = (
  links: Link[],
  textSegment: TextSegment
): Link | undefined => {
  const found = links.find((link: Link): boolean => {
    if (textSegment.type === 'source') {
      return link.sources.includes(textSegment.position);
    }

    if (textSegment.type === 'target') {
      return link.targets.includes(textSegment.position);
    }

    return false;
  });

  return found;
};