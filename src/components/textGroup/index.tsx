import React, { ReactElement, useContext } from 'react';

import { AlignmentContext } from 'contexts/alignment';
import { TextSegment, TextSegmentType } from 'core/structs';
import { TextSegmentWrapper } from 'components/textSegmentWrapper';

interface TextGroupProps {
  textSegments: TextSegment[];
}

export const TextGroup = (props: TextGroupProps) => {
  return <React.Fragment></React.Fragment>;
};

export default TextGroup;
