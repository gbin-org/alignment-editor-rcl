import { AlignmentState, AlignmentActionTypes } from 'contexts/alignment';
import {
  findReferenceLinkForTextSegment,
  findReferenceLinkForUserLink,
} from 'core/findLink';
import { Link, TextSegment, TextSegmentType } from 'core/structs';

const selectSegmentActions = (
  state: AlignmentState,
  dispatch: React.Dispatch<AlignmentActionTypes>
): Record<string, Function> => {
  const determineSourceSelectionAction = (
    type: TextSegmentType
  ):
    | 'toggleSelectedSourceTextSegment'
    | 'toggleSelectedReferenceTextSegment' => {
    if (type === 'source') {
      return 'toggleSelectedSourceTextSegment';
    }

    if (type === 'reference') {
      return 'toggleSelectedReferenceTextSegment';
    }

    if (type === 'target' && state.referenceLinks?.length) {
      return 'toggleSelectedReferenceTextSegment';
    }

    // default to Source for the compiler
    return 'toggleSelectedSourceTextSegment';
  };

  const toggleSegment = (textSegment: TextSegment): void => {
    if (textSegment.type === 'source') {
      dispatch({
        type: `toggleSelectedSourceTextSegment`,
        payload: { position: textSegment.position },
      });
    }
    if (textSegment.type === 'reference') {
      dispatch({
        type: `toggleSelectedReferenceTextSegment`,
        payload: { position: textSegment.position },
      });

      const relatedReferenceLink = findReferenceLinkForTextSegment(
        state.referenceLinks ?? [],
        textSegment
      );

      if (relatedReferenceLink) {
        toggleAllSegmentsForLink(textSegment, {} as Link, relatedReferenceLink);
      }
    }
    if (textSegment.type === 'target') {
      dispatch({
        type: `toggleSelectedTargetTextSegment`,
        payload: { position: textSegment.position },
      });
    }
  };

  const toggleAllSegmentsForLink = (
    origin: TextSegment,
    userLink: Link,
    referenceLink?: Link
  ) => {
    const sourceSelectionAction = determineSourceSelectionAction(origin.type);

    userLink.sources?.forEach((sourcePosition: number): void => {
      dispatch({
        type: sourceSelectionAction,
        payload: { position: sourcePosition },
      });
    });

    if (
      (origin.type === 'reference' || origin.type === 'target') &&
      state.referenceLinks &&
      state.referenceLinks.length
    ) {
      const relatedReferenceLink =
        referenceLink ??
        findReferenceLinkForUserLink(state.referenceLinks, userLink);

      relatedReferenceLink?.sources?.forEach((sourcePosition: number) => {
        dispatch({
          type: 'toggleSelectedSourceTextSegment',
          payload: { position: sourcePosition },
        });
      });
    }

    userLink.targets?.forEach((targetPosition: number): void => {
      dispatch({
        type: 'toggleSelectedTargetTextSegment',
        payload: { position: targetPosition },
      });
    });
  };

  return {
    toggleAllSegmentsForLink,
    toggleSegment,
  };
};
export default selectSegmentActions;
