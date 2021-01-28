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
  isFocused: boolean;
  isSelected: boolean;
  isLinked: boolean;
  isLinkedToSource: boolean;
  isLinkedToTarget: boolean;
  group: number;
  displayStyle: 'line' | 'paragraph';
  refCollector: (ref: HTMLDivElement) => void;
}

const lineDisplayStyle = { display: 'inline-block' };
const paragraphDisplayStyle = {
  display: 'inline-block',
  marginTop: '0.5rem',
  marginBottom: '0.5rem',
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
  const {
    segmentData,
    isSelected,
    isDisabled,
    isFocused,
    isLinked,
    isLinkedToSource,
    isLinkedToTarget,
    group,
    displayStyle,
    refCollector,
  } = props;
  //const color = segmentColors[segmentData.color || 0];

  const { state, dispatch } = useContext(AlignmentContext);

  //const relatedReferenceLink = findLinkForTextSegment(
  //state.referenceLinks,
  //segmentData
  //);
  const relatedUserLink = findLinkForTextSegment(state.userLinks, segmentData);

  //const primaryRelatedLink = determinePrimaryRelatedLink(segmentData, state);

  const selectedClass = isSelected ? 'selected' : '';
  const disabledClass = isDisabled ? 'disabled' : '';
  const linkedClass = isLinked ? 'linked' : 'not-linked';
  const locked = isLocked(state.inProgressLink, relatedUserLink);
  const lockedClass = locked ? 'locked' : 'unlocked';

  const linkedToSource = isLinked && isLinkedToSource ? 'linked-to-source' : '';

  const linkedToTarget = isLinked && isLinkedToTarget ? 'linked-to-target' : '';

  const focusedClass = isFocused ? 'focused' : '';

  const containerStyle =
    displayStyle === 'line' ? lineDisplayStyle : paragraphDisplayStyle;
  const renderedGroup = displayStyle === 'line' ? group : 0;

  return (
    <div
      style={{ ...containerStyle }}
      ref={refCollector}
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
