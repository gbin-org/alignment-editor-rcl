import React, { ReactElement, useContext } from 'react';

import { AlignmentContext } from 'contexts/alignment';
import { findLinkForTextSegment } from 'core/findLink';
import { determineGroup } from 'core/findGroup';
import { TextSegment, TextSegmentType } from 'core/structs';
import TextSegmentComponent from 'components/textSegment';

type Direction = 'ltr' | 'rtl';

interface TextPortionProps {
  type: TextSegmentType;
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

export const TextPortion = (props: TextPortionProps): ReactElement => {
  const { type, textSegments, displayStyle } = props;

  const { state } = useContext(AlignmentContext);

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
    <div
      style={{
        display: 'flex',
        alignContent: 'center',
        maxHeight: '15rem',
        padding: '0.5rem',
        marginBottom: '0.5rem',
        marginRight: '0.5rem',
      }}
    >
      <div
        className={`${type}-container`}
        style={{ ...configuredStyle, paddingRight: '5rem', direction }}
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
