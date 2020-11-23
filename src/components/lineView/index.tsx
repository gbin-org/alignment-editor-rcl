import React, { ReactElement, useEffect, useContext } from 'react';

import { AlignmentContext } from 'contexts/alignment';

import TextPortionComponent from 'components/textPortion';
import LinkComponent from 'components/link';

import { Link, TextSegment } from 'core/structs';

type Portion = 'source' | 'target';
type Direction = 'ltr' | 'rtl';

interface LineViewProps {
  sourceSegments: TextSegment[];
  targetSegments: TextSegment[];
  sourceDirection: Direction;
  targetDirection: Direction;
  displayStyle: 'full' | 'partial';
}

const fullDisplayStyle = { margin: '21.4rem' };
const partialDisplayStyle = { margin: '10rem' };

export const LineView = (props: LineViewProps): ReactElement => {
  const { sourceSegments, targetSegments } = props;

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

      <div id="links-container" style={{ position: 'relative' }}>
        {state.parentRef &&
          state.links.map((link: Link) => {
            return (
              <LinkComponent
                key={`${link.type}-${link.sources[0]}-${link.targets[0]}`}
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
        type="target"
        textSegments={targetSegments}
      />

      <div style={{ margin: '0.5rem' }} />
    </div>
  );
};

export default LineView;
