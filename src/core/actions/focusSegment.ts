import { Link, TextSegment } from 'core/structs';

import {
  findUserLinkForTextSegment,
  findReferenceLinkForTextSegment,
  findUserLinkForReferenceLink,
  findReferenceLinkForUserLink,
} from 'core/findLink';

import {
  AlignmentActionTypes,
  AlignmentState,
} from 'contexts/alignment/reducer';

const focusSegmentActions = (
  state: AlignmentState,
  dispatch: React.Dispatch<AlignmentActionTypes>
): Record<string, Function> => {
  const focusReferenceLink = (referenceLink: Link): void => {
    dispatch({ type: 'focusReferenceLink', payload: { link: referenceLink } });
  };

  const focusUserLink = (userLink: Link): void => {
    dispatch({ type: 'focusUserLink', payload: { link: userLink } });
  };

  const unFocusReferenceLink = (referenceLink: Link): void => {
    dispatch({
      type: 'unFocusReferenceLink',
      payload: { link: referenceLink },
    });
  };

  const unFocusUserLink = (userLink: Link): void => {
    dispatch({ type: 'unFocusUserLink', payload: { link: userLink } });
  };

  const focusUserLinkAndRelatedReferenceLink = (userLink: Link): void => {
    focusUserLink(userLink);

    const relatedReferenceLink = findReferenceLinkForUserLink(
      state.referenceLinks ?? [],
      userLink
    );

    if (relatedReferenceLink) {
      focusReferenceLink(relatedReferenceLink);
    }
  };

  const unFocusReferenceLinkAndRelatedUserLink = (
    referenceLink: Link
  ): void => {
    unFocusReferenceLink(referenceLink);

    const relatedUserLink = findUserLinkForReferenceLink(
      state.userLinks,
      referenceLink
    );

    if (relatedUserLink) {
      unFocusUserLink(relatedUserLink);
    }
  };

  const unFocusUserLinkAndRelatedReferenceLink = (userLink: Link): void => {
    unFocusUserLink(userLink);

    const relatedReferenceLink = findReferenceLinkForUserLink(
      state.referenceLinks ?? [],
      userLink
    );

    if (relatedReferenceLink) {
      unFocusReferenceLink(relatedReferenceLink);
    }
  };

  const findRelatedLinks = (
    textSegment: TextSegment
  ): { userLink: Link | undefined; referenceLink: Link | undefined } => {
    let userLink = undefined;
    let referenceLink = undefined;

    if (textSegment.type === 'source' && state.referenceLinks) {
      referenceLink = findReferenceLinkForTextSegment(
        state.referenceLinks,
        textSegment
      );
      if (referenceLink) {
        userLink = findUserLinkForReferenceLink(state.userLinks, referenceLink);
      }
    }
    if (textSegment.type === 'source' && !state.referenceLinks) {
      userLink = findUserLinkForTextSegment(state.userLinks, textSegment);
    }
    if (textSegment.type === 'reference' && state.referenceLinks) {
      userLink = findUserLinkForTextSegment(state.userLinks, textSegment);
      referenceLink = findReferenceLinkForTextSegment(
        state.referenceLinks,
        textSegment
      );

      if (!referenceLink && userLink) {
        referenceLink = findReferenceLinkForUserLink(
          state.referenceLinks,
          userLink
        );
      }

      if (!userLink && referenceLink) {
        userLink = findUserLinkForReferenceLink(state.userLinks, referenceLink);
      }
    }
    if (textSegment.type === 'target') {
      userLink = findUserLinkForTextSegment(state.userLinks, textSegment);
    }

    return { userLink, referenceLink };
  };

  const focusSegments = (textSegment: TextSegment): void => {
    const relatedLinks = findRelatedLinks(textSegment);

    if (relatedLinks.referenceLink && !relatedLinks.userLink) {
      focusReferenceLink(relatedLinks.referenceLink);
    }

    if (relatedLinks.referenceLink && relatedLinks.userLink) {
      focusReferenceLink(relatedLinks.referenceLink);
      focusUserLink(relatedLinks.userLink);
    }

    if (relatedLinks.userLink && !relatedLinks.referenceLink) {
      focusUserLinkAndRelatedReferenceLink(relatedLinks.userLink);
    }
  };

  const unFocusSegments = (textSegment: TextSegment): void => {
    const relatedLinks = findRelatedLinks(textSegment);

    if (relatedLinks.referenceLink) {
      unFocusReferenceLinkAndRelatedUserLink(relatedLinks.referenceLink);
    }
    if (relatedLinks.userLink) {
      unFocusUserLinkAndRelatedReferenceLink(relatedLinks.userLink);
    }
  };

  return { focusSegments, unFocusSegments };
};

export default focusSegmentActions;
