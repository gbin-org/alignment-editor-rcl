import React, { ReactElement, useEffect, useContext } from 'react';

import { AlignmentContext, AlignmentState } from 'contexts/alignment';

import { Link, TextSegment, SyntaxNode } from 'core/structs';
import TextPortionComponent from 'components/textPortion';

type Direction = 'ltr' | 'rtl';

interface TreeViewProps {
  sourceSegments: TextSegment[];
  referenceSegments?: TextSegment[];
  targetSegments: TextSegment[];
  sourceDirection: Direction;
  targetDirection: Direction;
  displayStyle: 'full' | 'partial';
  sourceSyntax: SyntaxNode;
}

export const TreeView = (props: TreeViewProps): ReactElement => {
  const { sourceSegments, referenceSegments, targetSegments, sourceSyntax } =
    props;

  //const { state } = useContext(AlignmentContext);

  return (
    <div style={{ display: 'flex', height: '27.25rem' }}>
      <div
        className="source-container"
        style={{ overflowY: 'scroll', flexBasis: '33%', flexGrow: '0%' }}
      >
        <div
          style={{
            textAlign: 'center',
            textDecoration: 'underline',
            fontSize: 'larger',
          }}
        >
          Source
        </div>
        <TextPortionComponent
          displayStyle="tree"
          type="source"
          textSegments={sourceSegments}
          sourceSyntax={sourceSyntax}
        />
      </div>

      <div
        className="bridge-container"
        style={{ overflowY: 'scroll', flexBasis: '33%', flexGrow: '0%' }}
      >
        <div
          style={{
            textAlign: 'center',
            textDecoration: 'underline',
            fontSize: 'larger',
          }}
        >
          LWC
        </div>
        <TextPortionComponent
          displayStyle="tree"
          type="reference"
          sourceSyntax={sourceSyntax}
          textSegments={referenceSegments ?? []}
        />
      </div>

      <div
        className="target-container"
        style={{ overflowY: 'scroll', flexBasis: '33%', flexGrow: '0%' }}
      >
        <div
          style={{
            textAlign: 'center',
            textDecoration: 'underline',
            fontSize: 'larger',
          }}
        >
          Target
        </div>
        <TextPortionComponent
          displayStyle="tree"
          type="target"
          sourceSyntax={sourceSyntax}
          textSegments={targetSegments}
        />
      </div>
    </div>
  );
};

export default TreeView;
