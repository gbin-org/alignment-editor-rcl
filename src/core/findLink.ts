import { TextSegment, Link } from 'core/structs';

export const findLinkForTextSegment = (
  links: Link[],
  textSegment: TextSegment
): Link | undefined => {
  const found = links.find((link: Link): boolean => {
    if (textSegment.type === 'source' && link.sources) {
      return link.sources.includes(textSegment.position);
    }

    if (
      textSegment.type === 'target' ||
      (textSegment.type === 'reference' && link.targets)
    ) {
      return link.targets.includes(textSegment.position);
    }

    return false;
  });

  return found;
};

export const findUserLinkForReferenceLink = (
  userLinks: Link[],
  referenceLink: Link
): Link | undefined => {
  return userLinks.find((userLink: Link) => {
    return referenceLink.sources.find((referenceLinkSource: number) => {
      return userLink.sources.includes(referenceLinkSource);
    });
  });
};

export const findReferenceLinkForUserLink = (
  referenceLinks: Link[],
  userLink: Link
): Link | undefined => {
  return referenceLinks.find((referenceLink: Link) => {
    return userLink.sources.find((userLinkSource: number) => {
      return referenceLink.sources.includes(userLinkSource);
    });
  });
};
