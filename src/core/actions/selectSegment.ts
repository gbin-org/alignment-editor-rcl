import { AlignmentState, AlignmentActionTypes } from 'contexts/alignment';
import { findReferenceLinkForUserLink } from 'core/findLink';
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

    // default to Source
    return 'toggleSelectedSourceTextSegment';
  };

  const toggleAllSegmentsForLink = (origin: TextSegment, userLink: Link) => {
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
      const relatedReferenceLink = findReferenceLinkForUserLink(
        state.referenceLinks,
        userLink
      );

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
  };
};
export default selectSegmentActions;
