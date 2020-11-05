import React, { ReactElement, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

import { AlignmentContext } from 'contexts/alignment';
import {
  AlignmentActionTypes,
  AlignmentState,
} from 'contexts/alignment/reducer';
import { findLinkForTextSegment } from 'core/findLink';
import { determineGroup } from 'core/findGroup';
import { TextSegment, TextSegmentType, Link } from 'core/structs';
import TextSegmentComponent from 'components/textSegment';

type Direction = 'ltr' | 'rtl';

interface TextPortionProps {
  type: TextSegmentType;
  textDirectionToggle: boolean;
  textSegments: TextSegment[];
  displayStyle: 'line' | 'paragraph';
}

const lineDisplayStyle = {
  display: 'inline-block',
  whiteSpace: 'nowrap',
};
const paragraphDisplayStyle = {
  display: 'inline-block',
};

const textDirectionToggle = (
  props: TextPortionProps,
  dispatch: React.Dispatch<AlignmentActionTypes>,
  state: AlignmentState
): ReactElement => {
  if (props.textDirectionToggle) {
    return (
      <FontAwesomeIcon
        icon={faExchangeAlt}
        style={{
          cursor: 'pointer',
          background: 'black',
          color: 'white',
          borderRadius: '5px',
          fontSize: '1rem',
          marginTop: '-0.2rem',
          padding: '0.3rem',
        }}
        onClick={(): void => {
          if (props.type === 'source') {
            const newDirection =
              state.sourceTextDirection === 'ltr' ? 'rtl' : 'ltr';
            dispatch({
              type: 'changeSourceTextDirection',
              payload: { textDirection: newDirection },
            });
            dispatch({ type: 'redrawUI', payload: {} });
          }
          if (props.type === 'target') {
            const newDirection =
              state.targetTextDirection === 'ltr' ? 'rtl' : 'ltr';
            dispatch({
              type: 'changeTargetTextDirection',
              payload: { textDirection: newDirection },
            });
            dispatch({ type: 'redrawUI', payload: {} });
          }
        }}
      />
    );
  }
  return <></>;
};
export const TextPortion = (props: TextPortionProps): ReactElement => {
  const { type, textSegments, displayStyle } = props;

  const { state, dispatch } = useContext(AlignmentContext);

  const direction =
    props.type === 'source'
      ? state.sourceTextDirection
      : state.targetTextDirection;

  const configuredStyle =
    displayStyle === 'line' ? lineDisplayStyle : paragraphDisplayStyle;

  const segmentSelections =
    props.type === 'source'
      ? state.selectedSourceTextSegments
      : state.selectedTargetTextSegments;

  return (
    <div style={{ display: 'flex', alignContent: 'center' }}>
      {textDirectionToggle(props, dispatch, state)}

      <div
        className={`${type}-container`}
        style={{ ...configuredStyle, direction }}
      >
        {textSegments.map(
          (textSegment, index): ReactElement => {
            const relatedLink = findLinkForTextSegment(
              state.links,
              textSegment
            );
            const linkIndex = relatedLink
              ? state.links.indexOf(relatedLink)
              : index;
            return (
              <TextSegmentComponent
                key={`${type}-${textSegment.position}`}
                segmentData={textSegment}
                isDisabled={textSegment.catIsContent === false ?? false}
                isSelected={segmentSelections[textSegment.position] ?? false}
                isLinked={Boolean(relatedLink)}
                group={determineGroup(state.links, linkIndex)}
                displayStyle={displayStyle}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default TextPortion;
