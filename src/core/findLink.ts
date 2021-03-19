import { TextSegment, Link } from 'core/structs';

export const findUserLinkForTextSegment = (
  userLinks: Link[],
  textSegment: TextSegment
): Link | undefined => {
  if (textSegment.type === 'source') {
    return userLinks.find((userLink: Link) => {
      return userLink.sources.includes(textSegment.position);
    });
  }

  if (textSegment.type === 'reference') {
    return userLinks.find((userLink: Link) => {
      return userLink.sources.includes(textSegment.position);
    });
  }

  if (textSegment.type === 'target') {
    return userLinks.find((userLink: Link) => {
      return userLink.targets.includes(textSegment.position);
    });
  }
};

export const findReferenceLinkForTextSegment = (
  referenceLinks: Link[],
  textSegment: TextSegment
): Link | undefined => {
  if (textSegment.type === 'source') {
    return referenceLinks.find((referenceLink: Link) => {
      return referenceLink.sources.includes(textSegment.position);
    });
  }

  if (textSegment.type === 'reference') {
    return referenceLinks.find((referenceLink: Link) => {
      return referenceLink.targets.includes(textSegment.position);
    });
  }

  if (textSegment.type === 'target') {
    return undefined;
  }
};

export const findLinkForTextSegment = (
  links: Link[],
  textSegment: TextSegment
): Link | undefined => {
  const found = links.find((link: Link): boolean => {
    if (
      textSegment.type === 'source' ||
      (textSegment.type === 'reference' && link.sources)
    ) {
      return link.sources.includes(textSegment.position);
    }

    if (textSegment.type === 'target' && link.targets) {
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
    return referenceLink.targets.find((referenceLinkSource: number) => {
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
      return referenceLink.targets.includes(userLinkSource);
    });
  });
};
