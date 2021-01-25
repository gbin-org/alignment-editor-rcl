import React, { ReactElement, useContext } from 'react';

import {
  AlignmentActionTypes,
  AlignmentState,
} from 'contexts/alignment/reducer';

import { AlignmentContext } from 'contexts/alignment';
import { Link, Gloss, TextSegment, TextSegmentType } from 'core/structs';
import {
  findLinkForTextSegment,
  findUserLinkForReferenceLink,
  findReferenceLinkForUserLink,
} from 'core/findLink';

import arrayHasIntersection from 'core/arrayHasIntersection';
import focusSegmentActions from 'core/actions/focusSegment';

import './textSegmentStyle.scss';

export interface TextSegmentProps {
  segmentData: TextSegment;
  isDisabled: boolean;
  isSelected: boolean;
  group: number;
  displayStyle: 'line' | 'paragraph';
}

const lineDisplayStyle = { display: 'inline-block' };
const paragraphDisplayStyle = {
  display: 'inline-block',
  marginTop: '0.5rem',
  marginBottom: '0.5rem',
};

const isLinked = (
  type: TextSegmentType,
  position: number,
  state: AlignmentState
): boolean => {
  if (type === 'source' && state.referenceLinks.length) {
    return Boolean(
      state.referenceLinks.find((link) => {
        return link.sources.includes(position);
      })
    );
  }

  if (type === 'source' && !state.referenceLinks.length) {
    return Boolean(
      state.userLinks.find((link) => {
        return link.sources.includes(position);
      })
    );
  }

  if (type === 'reference') {
    return (
      Boolean(
        state.referenceLinks.find((link) => {
          return link.targets.includes(position);
        })
      ) ||
      Boolean(
        state.userLinks.find((link) => {
          return link.sources.includes(position);
        })
      )
    );
  }

  if (type === 'target') {
    return Boolean(
      state.userLinks.find((link) => {
        return link.targets.includes(position);
      })
    );
  }

  return false;
};

const updateInProgressLink = (
  relatedLink: Link,
  inProgressLink: Link | null,
  dispatch: React.Dispatch<AlignmentActionTypes>
): void => {
  // in progress link, toggle
  //if (inProgressLink) {
  dispatch({
    type: 'setInProgressLink',
    payload: {
      id: relatedLink.id,
      sources: relatedLink.sources,
      targets: relatedLink.targets,
      type: 'manual',
    },
  });
};

const toggleAllSegmentsForLink = (
  link: Link,
  dispatch: React.Dispatch<AlignmentActionTypes>
): void => {
  link.sources.forEach((sourcePosition: number): void => {
    dispatch({
      type: 'toggleSelectedSourceTextSegment',
      payload: { position: sourcePosition },
    });
  });

  link.targets?.forEach((targetPosition: number): void => {
    dispatch({
      type: 'toggleSelectedTargetTextSegment',
      payload: { position: targetPosition },
    });
  });
};

const toggleSegmentSelection = (
  type: TextSegmentType,
  position: number,
  dispatch: React.Dispatch<AlignmentActionTypes>
): void => {
  if (type === 'source') {
    dispatch({
      type: `toggleSelectedSourceTextSegment`,
      payload: { position },
    });
  }
  if (type === 'target') {
    dispatch({
      type: `toggleSelectedTargetTextSegment`,
      payload: { position },
    });
  }
};

const toggleInProgressSegment = (
  type: TextSegmentType,
  position: number,
  dispatch: React.Dispatch<AlignmentActionTypes>
): void => {
  dispatch({
    type: `toggleInProgressLinkSegment`,
    payload: { position, type },
  });
};

const noPreviousSelectionAndUserSelectsLink = (
  relatedLink: Link | undefined,
  inProgressLink: Link | null
): boolean => {
  return Boolean(relatedLink) && !Boolean(inProgressLink);
};

const previousSelectionAndUserDeselectsLink = (
  relatedLink: Link | undefined,
  inProgressLink: Link | null
): boolean => {
  return Boolean(relatedLink) && Boolean(inProgressLink);
};

const previousSelectionAndUserTogglesSegment = (
  inProgressLink: Link | null
): boolean => {
  return Boolean(inProgressLink);
};

const handleClick = (
  type: TextSegmentType,
  position: number,
  relatedLink: Link | undefined,
  inProgressLink: Link | null,
  dispatch: React.Dispatch<AlignmentActionTypes>
): void => {
  if (noPreviousSelectionAndUserSelectsLink(relatedLink, inProgressLink)) {
    if (relatedLink) {
      // blurg. this is to make ts compiler happy.
      updateInProgressLink(relatedLink, inProgressLink, dispatch);
      toggleAllSegmentsForLink(relatedLink, dispatch);
    }
  } else if (
    previousSelectionAndUserDeselectsLink(relatedLink, inProgressLink)
  ) {
    toggleSegmentSelection(type, position, dispatch);
    toggleInProgressSegment(type, position, dispatch);
    dispatch({ type: 'redrawUI', payload: {} });
  } else if (previousSelectionAndUserTogglesSegment(inProgressLink)) {
    if (inProgressLink) {
      updateInProgressLink(
        {
          id: inProgressLink.id,
          sources: inProgressLink.sources
            .concat(type === 'source' ? [position] : [])
            .sort(),
          targets: inProgressLink.targets
            .concat(type === 'target' ? [position] : [])
            .sort(),
          type: 'manual',
        },
        inProgressLink,
        dispatch
      );
      toggleSegmentSelection(type, position, dispatch);
      dispatch({ type: 'redrawUI', payload: {} });
    }
  } else {
    // user is toggling a segment with no previous link selected
    toggleSegmentSelection(type, position, dispatch);
    dispatch({ type: 'redrawUI', payload: {} });
  }
};

const isLocked = (
  inProgressLink: Link | null,
  relatedLink: Link | undefined
): boolean => {
  if (inProgressLink && relatedLink) {
    return (
      // If there is a link being built
      Boolean(inProgressLink) &&
      // And there is a link related to this segment
      Boolean(relatedLink) &&
      // And the related link's sources do not intersect with the inProgress sources
      !(
        arrayHasIntersection(inProgressLink.sources, relatedLink.sources) ||
        // And the related link's targets do no intersect with the inProgress targets
        arrayHasIntersection(inProgressLink.targets, relatedLink.targets)
      )
    );
  }
  return false;
};

const glossDisplay = (
  props: TextSegmentProps,
  sourceGlosses: Gloss[]
): ReactElement => {
  const sourceGloss = sourceGlosses?.find((gloss) => {
    return gloss.position === props.segmentData.position;
  });

  if (props.segmentData.type === 'source' && sourceGloss) {
    return (
      <span
        className="source-gloss"
        style={{
          display: 'inline-block',
          fontSize: '0.8rem',
          fontStyle: 'italic',
          marginLeft: '0.5rem',
          marginRight: '0.5rem',
        }}
      >
        {sourceGloss.glossText}
      </span>
    );
  }

  return <></>;
};

const isFocused = (
  textSegment: TextSegment,
  state: AlignmentState
): boolean => {
  console.log('isFocused()');
  if (textSegment.type === 'source' && state.referenceLinks) {
    const focusedReferenceLink = Array.from(
      state.focusedReferenceLinks.keys()
    ).find((link: Link) => {
      return link.sources.includes(textSegment.position);
    });

    return Boolean(
      state.focusedReferenceLinks.get(focusedReferenceLink ?? ({} as Link))
    );
  }

  if (textSegment.type === 'source' && !state.referenceLinks) {
    const focusedLink = Array.from(state.focusedUserLinks.keys()).find(
      (link: Link) => {
        return link.sources.includes(textSegment.position);
      }
    );
    return Boolean(state.focusedUserLinks.get(focusedLink ?? ({} as Link)));
  }

  if (textSegment.type === 'reference') {
    const focusedReferenceLink = Array.from(
      state.focusedReferenceLinks.keys()
    ).find((link: Link) => {
      return link.targets.includes(textSegment.position);
    });

    const focusedUserLink = Array.from(state.focusedUserLinks.keys()).find(
      (link: Link) => {
        return link.sources.includes(textSegment.position);
      }
    );

    return (
      Boolean(
        state.focusedReferenceLinks.get(focusedReferenceLink ?? ({} as Link))
      ) || Boolean(state.focusedUserLinks.get(focusedUserLink ?? ({} as Link)))
    );
  }

  if (textSegment.type === 'target') {
    const focusedUserLink = Array.from(state.focusedUserLinks.keys()).find(
      (link: Link) => {
        return link.targets.includes(textSegment.position);
      }
    );

    return Boolean(state.focusedUserLinks.get(focusedUserLink ?? ({} as Link)));
  }

  return false;
};
//const isFocused = (
//relevantLink: Link | undefined,
//textSegmentType: TextSegmentType,
//state: AlignmentState
//): boolean => {
//if (!relevantLink) {
//return false;
//}

//if (textSegmentType === 'source') {
//return Boolean(state.focusedReferenceLinks.get(relevantLink));
//}

//if (textSegmentType === 'reference') {
//return (
//Boolean(state.focusedReferenceLinks.get(relevantLink)) ||
//Boolean(state.focusedUserLinks.get(relevantLink)) ||
//Boolean(
//state.focusedReferenceLinks.get(
//findReferenceLinkForUserLink(state.referenceLinks, relevantLink) ??
//({} as Link)
//)
//)
//);
//}

//if (textSegmentType === 'target') {
//return Boolean(state.focusedUserLinks.get(relevantLink));
//}

//return false;
//};

//const findRelevantLinkSet = (
//textSegment: TextSegment,
//state: AlignmentState
//): Link[] => {
//if (textSegment.type === 'source' && state.referenceLinks.length) {
//return state.referenceLinks;
//}

//if (textSegment.type === 'source' && !state.referenceLinks.length) {
//return state.userLinks;
//}

//if (textSegment.type === 'reference') {
//const referenceLink = findLinkForTextSegment(
//state.referenceLinks,
//textSegment
//);
//const userLinks = findLinkForTextSegment(state.userLinks, textSegment);
//}

//if (type === 'target') {
//return state.userLinks;
//}

//return [];
//};

const determinePrimaryRelatedLink = (
  textSegment: TextSegment,
  state: AlignmentState
): 'user' | 'reference' => {
  if (textSegment.type === 'source' && state.referenceLinks.length) {
    return 'reference';
  }

  if (textSegment.type === 'source' && !state.referenceLinks.length) {
    return 'user';
  }

  if (textSegment.type === 'reference') {
    return 'reference';
  }

  // 'target" case
  return 'user';
};
export const TextSegmentComponent = (props: TextSegmentProps): ReactElement => {
  const { segmentData, isSelected, isDisabled, group, displayStyle } = props;
  //const color = segmentColors[segmentData.color || 0];

  const { state, dispatch } = useContext(AlignmentContext);

  const relatedReferenceLink = findLinkForTextSegment(
    state.referenceLinks,
    segmentData
  );
  const relatedUserLink = findLinkForTextSegment(state.userLinks, segmentData);

  const primaryRelatedLink = determinePrimaryRelatedLink(segmentData, state);

  const selectedClass = isSelected ? 'selected' : '';
  const disabledClass = isDisabled ? 'disabled' : '';
  const linkedClass = isLinked(segmentData.type, segmentData.position, state)
    ? 'linked'
    : 'not-linked';
  const locked = isLocked(state.inProgressLink, relatedUserLink);
  const lockedClass = locked ? 'locked' : 'unlocked';

  const linkedToSource =
    isLinked &&
    segmentData.type === 'reference' &&
    Boolean(
      state.referenceLinks.find((link) => {
        return link.targets.includes(segmentData.position);
      })
    )
      ? 'linked-to-source'
      : '';

  const linkedToTarget =
    isLinked &&
    segmentData.type === 'reference' &&
    Boolean(
      state.userLinks.find((link) => {
        return link.sources.includes(segmentData.position);
      })
    )
      ? 'linked-to-target'
      : '';

  //const isLinkableClass = isLinkable ? "linkable" : "not-linkable";

  const focused = isFocused(segmentData, state);

  console.log('isFocused?', focused);

  const focusedClass = focused ? 'focused' : '';

  const containerStyle =
    displayStyle === 'line' ? lineDisplayStyle : paragraphDisplayStyle;
  const renderedGroup = displayStyle === 'line' ? group : 0;

  return (
    <div
      style={{ ...containerStyle }}
      ref={(ref: HTMLDivElement) => {
        if (ref && displayStyle === 'line') {
          if (segmentData.type === 'source') {
            if (state.sourceRefs[segmentData.position] !== ref) {
              dispatch({
                type: 'addSourceRef',
                payload: { position: segmentData.position, ref: ref },
              });
            }
          }
          if (state.targetRefs[segmentData.position] !== ref) {
            if (segmentData.type === 'target') {
              dispatch({
                type: 'addTargetRef',
                payload: { position: segmentData.position, ref: ref },
              });
            }
          }

          if (state.referenceRefs[segmentData.position] !== ref) {
            if (segmentData.type === 'reference') {
              dispatch({
                type: 'addReferenceRef',
                payload: { position: segmentData.position, ref: ref },
              });
            }
          }
        }
      }}
      className={`${segmentData.type}${segmentData.position}`}
    >
      <div
        role="button"
        className={`text-segment ${segmentData.type} ${disabledClass} ${lockedClass} ${linkedClass} ${selectedClass} ${focusedClass} group-${renderedGroup} ${linkedToSource} ${linkedToTarget}`}
        style={{ display: 'inline-block', textAlign: 'center' }}
        tabIndex={0}
        onClick={() => {
          if (!locked) {
            //handleClick(
            //segmentData.type,
            //segmentData.position,
            //relatedLink,
            //state.inProgressLink,
            //dispatch
            //);
          }
        }}
        onKeyPress={() => {
          if (!locked) {
            //handleClick(
            //segmentData.type,
            //segmentData.position,
            //relatedLink,
            //state.inProgressLink,
            //dispatch
            //);
          }
        }}
        onMouseOver={() => {
          focusSegmentActions(state, dispatch).focusSegments(segmentData);
        }}
        onMouseLeave={() => {
          focusSegmentActions(state, dispatch).unFocusSegments(segmentData);
        }}
      >
        {segmentData.text}
        {state.displayGlosses && glossDisplay(props, state.sourceGlosses)}
      </div>

      {/*enrichedDataBottom(props)*/}
    </div>
  );
};

export default TextSegmentComponent;
