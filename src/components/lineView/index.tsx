import React, { ReactElement, useContext } from 'react';

import { AlignmentContext } from 'contexts/alignment';

import TextPortionComponent from 'components/textPortion';
import LinkComponent from 'components/link';

import { Link, TextSegment } from 'core/structs';

type Portion = 'source' | 'target';
type Direction = 'ltr' | 'rtl';

interface LineViewProps {
  links: Link[];
  sourceSegments: TextSegment[];
  targetSegments: TextSegment[];
  sourceDirection: Direction;
  targetDirection: Direction;
  displayStyle: 'full' | 'partial';
}

const fullDisplayStyle = { margin: '14rem' };
const partialDisplayStyle = { margin: '10rem' };

export const LineView = (props: LineViewProps): ReactElement => {
  const { links, sourceSegments, targetSegments } = props;

  const { state, dispatch } = useContext(AlignmentContext);

  const configuredStyle =
    props.displayStyle === 'full' ? fullDisplayStyle : partialDisplayStyle;
  const textDirectionToggle = props.displayStyle === 'full' ? true : false;
  return (
    <div
      id="alignment-canvas"
      ref={(ref: HTMLDivElement) => {
        if (ref !== state.parentRef) {
          dispatch({ type: 'addParentRef', payload: { ref: ref } });
        }
      }}
      style={{ overflow: 'scroll' }}
    >
      <div style={{ margin: '0.6rem' }} />

      <TextPortionComponent
        type="source"
        displayStyle="line"
        textDirectionToggle={textDirectionToggle}
        textSegments={sourceSegments}
        links={links}
      />

      <div id="links-container" style={{ position: 'relative' }}>
        {state.parentRef &&
          links.map((link: Link) => {
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
        textDirectionToggle={textDirectionToggle}
        textSegments={targetSegments}
        links={links}
      />

      <div style={{ margin: '0.5rem' }} />
    </div>
  );
};

export default LineView;
