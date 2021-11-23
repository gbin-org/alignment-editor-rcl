import React, { ReactElement, useEffect, useContext } from 'react';

import { AlignmentContext, AlignmentState } from 'contexts/alignment';

import { Link, TextSegment } from 'core/structs';
import TextPortionComponent from 'components/textPortion';

type Direction = 'ltr' | 'rtl';

interface TreeViewProps {
  sourceSegments: TextSegment[];
  referenceSegments?: TextSegment[];
  targetSegments: TextSegment[];
  sourceDirection: Direction;
  targetDirection: Direction;
  displayStyle: 'full' | 'partial';
}

export const TreeView = (props: TreeViewProps): ReactElement => {
  const { sourceSegments, referenceSegments, targetSegments } = props;

  //const { state } = useContext(AlignmentContext);

  return (
    <div style={{ display: 'flex', height: '27.25rem' }}>
      <div className="source-container" style={{ overflowY: 'scroll' }}>
        <TextPortionComponent
          displayStyle="paragraph"
          type="source"
          textSegments={sourceSegments}
        />
      </div>

      <div className="bridge-container" style={{ overflowY: 'scroll' }}>
        <TextPortionComponent
          displayStyle="paragraph"
          type="reference"
          textSegments={referenceSegments ?? []}
        />
      </div>

      <div className="target-container" style={{ overflowY: 'scroll' }}>
        <TextPortionComponent
          displayStyle="paragraph"
          type="target"
          textSegments={targetSegments}
        />
      </div>
    </div>
  );
};

export default TreeView;
