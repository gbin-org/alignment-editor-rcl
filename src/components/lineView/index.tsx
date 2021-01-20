import React, { ReactElement, useEffect, useContext } from 'react';

import { AlignmentContext } from 'contexts/alignment';

import TextPortionComponent from 'components/textPortion';
import LinkComponent from 'components/link';

import { Link, TextSegment } from 'core/structs';

type Portion = 'source' | 'target';
type Direction = 'ltr' | 'rtl';

interface LineViewProps {
  sourceSegments: TextSegment[];
  referenceSegments: TextSegment[];
  targetSegments: TextSegment[];
  sourceDirection: Direction;
  targetDirection: Direction;
  displayStyle: 'full' | 'partial';
}

const fullDisplayStyle = { margin: '8em' };
const partialDisplayStyle = { margin: '3.5rem' };

export const LineView = (props: LineViewProps): ReactElement => {
  const { sourceSegments, referenceSegments, targetSegments } = props;

  const { state, dispatch } = useContext(AlignmentContext);

  const configuredStyle =
    props.displayStyle === 'full' ? fullDisplayStyle : partialDisplayStyle;

  useEffect(() => {
    dispatch({ type: 'redrawUI', payload: {} });
    // This effect should run as component mounts/unmounts.
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <div
      id="alignment-canvas"
      ref={(ref: HTMLDivElement) => {
        if (
          ref &&
          (state.parentRef === null ||
            ref.valueOf() !== state.parentRef.valueOf())
        ) {
          dispatch({ type: 'addParentRef', payload: { ref: ref } });
        }
      }}
      style={{ overflow: 'scroll' }}
    >
      <div style={{ margin: '0.6rem' }} />

      <TextPortionComponent
        type="source"
        displayStyle="line"
        textSegments={sourceSegments}
      />

      <div id="reference-links-container" style={{ position: 'relative' }}>
        {state.parentRef &&
          state.referenceLinks?.map((link: Link) => {
            return (
              <LinkComponent
                key={`${link.type}-${link.sources[0]}-${link.targets[0]}`}
                type="reference"
                link={link}
                sourcePosition={link.sources[0]}
                targetPosition={link.targets[0]}
              />
            );
          })}
      </div>

      <div id="user-links-container" style={{ position: 'relative' }}>
        {state.parentRef &&
          state.userLinks.map((link: Link) => {
            return (
              <LinkComponent
                key={`${link.type}-${link.sources[0]}-${link.targets[0]}`}
                type="user"
                link={link}
                sourcePosition={link.sources[0]}
                targetPosition={link.targets[0]}
              />
            );
          })}
      </div>

      <div style={configuredStyle} />

      <TextPortionComponent
        displayStyle="line"
        type="reference"
        textSegments={referenceSegments}
      />

      <div style={configuredStyle} />

      <TextPortionComponent
        type="target"
        displayStyle="line"
        textSegments={targetSegments}
      />
    </div>
  );
};

export default LineView;
