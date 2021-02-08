import React, { ReactElement, useContext } from 'react';

import { AlignmentContext } from 'contexts/alignment';
import { TextSegment, TextSegmentType } from 'core/structs';
import { TextSegmentWrapper } from 'components/textSegmentWrapper';

interface TextPortionProps {
  type: TextSegmentType;
  textSegments: TextSegment[];
  displayStyle: 'line' | 'paragraph';
}

const lineDisplayStyle = {
  display: 'inline-block',
  whiteSpace: 'nowrap',
  height: '2rem',
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

  return (
    <div
      className="text-portion-container"
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
        {textSegments?.map(
          (textSegment: TextSegment): ReactElement => {
            return (
              <TextSegmentWrapper
                key={`${type}-${textSegment.position}`}
                textSegment={textSegment}
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
