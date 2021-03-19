import React, { ReactElement, useEffect, useContext } from 'react';

import { AlignmentContext, AlignmentState } from 'contexts/alignment';

import TextPortionComponent from 'components/textPortion';
import LinkComponent from 'components/link';

import { Link, TextSegment } from 'core/structs';

type Direction = 'ltr' | 'rtl';

interface LineViewProps {
  sourceSegments: TextSegment[];
  referenceSegments?: TextSegment[];
  targetSegments: TextSegment[];
  sourceDirection: Direction;
  targetDirection: Direction;
  displayStyle: 'full' | 'partial';
}

const fullDisplayStyleNoBridge = { margin: '14em' };
const fullDisplayStyleWithBridge = { margin: '8em' };
const partialDisplayStyleWithBridge = { margin: '3.5rem' };
const partialDisplayStyleNoBridge = { margin: '10rem' };

const isBridgeMode = (state: AlignmentState): boolean => {
  return state.referenceLinks !== null;
};

const linkIsValidForDisplay = (link: Link, state: AlignmentState): boolean => {
  const relevantSourceSegments = isBridgeMode(state)
    ? state.selectedReferenceTextSegments
    : state.selectedSourceTextSegments;

  if (link.id === state.inProgressLink?.id) {
    return (
      link.sources.every((position: number) => {
        return relevantSourceSegments[position];
      }) &&
      link.targets.every((position: number) => {
        return state.selectedTargetTextSegments[position];
      })
    );
  }
  return true;
};

const determineDisplayStyle = (
  displayStyle: 'partial' | 'full',
  state: AlignmentState
): { margin: string } => {
  if (isBridgeMode(state) && displayStyle === 'full') {
    return fullDisplayStyleWithBridge;
  }

  if (!isBridgeMode(state) && displayStyle === 'full') {
    return fullDisplayStyleNoBridge;
  }

  if (isBridgeMode(state) && displayStyle === 'partial') {
    return partialDisplayStyleWithBridge;
  }

  if (!isBridgeMode(state) && displayStyle === 'partial') {
    return partialDisplayStyleNoBridge;
  }

  return { margin: '' };
};

export const LineView = (props: LineViewProps): ReactElement => {
  const { sourceSegments, referenceSegments, targetSegments } = props;

  const { state, dispatch } = useContext(AlignmentContext);

  const configuredStyle = determineDisplayStyle(props.displayStyle, state);

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
            if (linkIsValidForDisplay(link, state)) {
              return (
                <LinkComponent
                  key={`${link.type}-${link.sources[0]}-${link.targets[0]}`}
                  type="user"
                  link={link}
                  sourcePosition={link.sources[0]}
                  targetPosition={link.targets[0]}
                />
              );
            }
            return null;
          })}
      </div>

      <div className="spacer" style={configuredStyle} />

      {(() => {
        if (referenceSegments && referenceSegments.length) {
          return (
            <TextPortionComponent
              displayStyle="line"
              type="reference"
              textSegments={referenceSegments}
            />
          );
        }
        if (isBridgeMode(state)) {
          return (
            <div className="reference-spacer" style={{ height: '6.5rem' }} />
          );
        }
      })()}

      {(() => {
        if (referenceSegments && referenceSegments.length) {
          return <div className="spacer" style={configuredStyle} />;
        }
      })()}

      <TextPortionComponent
        type="target"
        displayStyle="line"
        textSegments={targetSegments}
      />
    </div>
  );
};

export default LineView;
