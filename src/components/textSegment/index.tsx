import React, { ReactElement, useContext } from 'react';

import {
  AlignmentActionTypes,
  AlignmentState,
} from 'contexts/alignment/reducer';

import { AlignmentContext } from 'contexts/alignment';
import { Link, Gloss, TextSegment, TextSegmentType } from 'core/structs';
import { findLinkForTextSegment } from 'core/findLink';

import selectSegmentActions from 'core/actions/selectSegment';

import arrayHasIntersection from 'core/arrayHasIntersection';
import focusSegmentActions from 'core/actions/focusSegment';

import './textSegmentStyle.scss';

export interface TextSegmentProps {
  textSegment: TextSegment;
  isDisabled: boolean;
  isFocused: boolean;
  isSelected: boolean;
  isLinked: boolean;
  isLinkedToSource: boolean;
  isLinkedToTarget: boolean;
  forcedLock: boolean;
  group: number;
  displayStyle: 'line' | 'paragraph';
  refCollector: (ref: HTMLDivElement) => void;
  sourcePartOfSpeech: string | undefined;
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
  textSegment: TextSegment,
  relatedLink: Link | undefined,
  state: AlignmentState,
  dispatch: React.Dispatch<AlignmentActionTypes>
): void => {
  if (
    noPreviousSelectionAndUserSelectsLink(relatedLink, state.inProgressLink)
  ) {
    if (relatedLink) {
      // blurg. this is to make ts compiler happy.
      updateInProgressLink(relatedLink, state.inProgressLink, dispatch);
      selectSegmentActions(state, dispatch).toggleAllSegmentsForLink(
        textSegment,
        relatedLink
      );
    }
  } else if (
    previousSelectionAndUserDeselectsLink(relatedLink, state.inProgressLink)
  ) {
    selectSegmentActions(state, dispatch).toggleSegment(textSegment);
    toggleInProgressSegment(textSegment.type, textSegment.position, dispatch);
    dispatch({ type: 'redrawUI', payload: {} });
  } else if (previousSelectionAndUserTogglesSegment(state.inProgressLink)) {
    if (state.inProgressLink) {
      updateInProgressLink(
        {
          id: state.inProgressLink.id,
          sources: state.inProgressLink.sources
            .concat(textSegment.type === 'source' ? [textSegment.position] : [])
            .sort(),
          targets: state.inProgressLink.targets
            .concat(textSegment.type === 'target' ? [textSegment.position] : [])
            .sort(),
          type: 'manual',
        },
        state.inProgressLink,
        dispatch
      );
      selectSegmentActions(state, dispatch).toggleSegment(textSegment);
      dispatch({ type: 'redrawUI', payload: {} });
    }
  } else {
    // user is toggling a segment with no previous link selected
    selectSegmentActions(state, dispatch).toggleSegment(textSegment);
    dispatch({ type: 'redrawUI', payload: {} });
  }
};

const isLocked = (
  inProgressLink: Link | null,
  relatedLink: Link | undefined,
  forcedLock: boolean
): boolean => {
  if (forcedLock) {
    return true;
  }

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
    return gloss.position === props.textSegment.position;
  });

  if (props.textSegment.type === 'source' && sourceGloss) {
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

const partOfSpeechDisplay = (textSegment: TextSegment) => {
  if (textSegment.type === 'source' && textSegment.partOfSpeech) {
    return (
      <div
        style={{
          fontSize: '0.8rem',
        }}
      >
        {textSegment.partOfSpeech}
      </div>
    );
  }
};

export const TextSegmentComponent = (props: TextSegmentProps): ReactElement => {
  const {
    textSegment,
    isSelected,
    isDisabled,
    isFocused,
    isLinked,
    isLinkedToSource,
    isLinkedToTarget,
    forcedLock,
    group,
    displayStyle,
    refCollector,
    sourcePartOfSpeech,
  } = props;

  const { state, dispatch } = useContext(AlignmentContext);

  const relatedUserLink = findLinkForTextSegment(state.userLinks, textSegment);

  const selectedClass = isSelected ? 'selected' : '';
  const disabledClass = isDisabled ? 'disabled' : '';
  const linkedClass = isLinked ? 'linked' : 'not-linked';
  const locked = isLocked(state.inProgressLink, relatedUserLink, forcedLock);
  const lockedClass = locked ? 'locked' : 'unlocked';
  const partOfSpeechClass = textSegment.partOfSpeech || sourcePartOfSpeech;
  const linkedToSource = isLinked && isLinkedToSource ? 'linked-to-source' : '';

  const linkedToTarget = isLinked && isLinkedToTarget ? 'linked-to-target' : '';

  const focusedClass = isFocused ? 'focused' : '';

  const containerStyle =
    displayStyle === 'line' ? lineDisplayStyle : paragraphDisplayStyle;
  const renderedGroup = displayStyle === 'line' ? group : 0;

  if (textSegment.type === 'reference') {
    console.log(
      'SEGMENT',
      textSegment.position,
      textSegment.text,
      textSegment.partOfSpeech
    );
  }
  return (
    textSegment && (
      <div
        style={{ ...containerStyle }}
        ref={refCollector}
        className={`${textSegment.type}${textSegment.position}`}
      >
        <div
          role="button"
          className={`text-segment ${textSegment.type} ${disabledClass} ${lockedClass} ${linkedClass} ${selectedClass} ${focusedClass} group-${renderedGroup} ${linkedToSource} ${linkedToTarget}`}
          style={{ display: 'inline-block', textAlign: 'center' }}
          tabIndex={0}
          onClick={() => {
            if (!locked) {
              const relatedLink = findLinkForTextSegment(
                state.userLinks,
                textSegment
              );
              handleClick(textSegment, relatedLink, state, dispatch);
            }
          }}
          onKeyPress={() => {
            if (!locked) {
              const relatedLink = findLinkForTextSegment(
                state.userLinks,
                textSegment
              );
              handleClick(textSegment, relatedLink, state, dispatch);
            }
          }}
          onMouseOver={() => {
            focusSegmentActions(state, dispatch).focusSegments(textSegment);
          }}
          onMouseLeave={() => {
            focusSegmentActions(state, dispatch).unFocusSegments(textSegment);
          }}
        >
          <span className={`text ${partOfSpeechClass}`}>
            {textSegment.text}
          </span>
          {state.displayGlosses && glossDisplay(props, state.sourceGlosses)}

          {partOfSpeechDisplay(textSegment)}
        </div>
        {/*enrichedDataBottom(props)*/}
      </div>
    )
  );
};

export default TextSegmentComponent;
