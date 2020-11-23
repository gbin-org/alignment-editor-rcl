import React, { ReactElement, useContext } from 'react';

import { AlignmentContext } from 'contexts/alignment';

import TextPortionComponent from 'components/textPortion';
import LineView from 'components/lineView';

import { Link, TextSegment } from 'core/structs';

type Portion = 'source' | 'target';
type Direction = 'ltr' | 'rtl';

interface ParagraphViewProps {
  sourceSegments: TextSegment[];
  targetSegments: TextSegment[];
  sourceDirection: Direction;
  targetDirection: Direction;
}

const singleLinkAlignment = (
  props: ParagraphViewProps,
  focusedLinks: Map<Link, boolean>,
  selectedSourceTextSegments: Record<number, boolean>,
  selectedTargetTextSegments: Record<number, boolean>
): ReactElement[] | ReactElement => {
  const selectedSources = props.sourceSegments.filter(
    (sourceSegment: TextSegment) => {
      return selectedSourceTextSegments[sourceSegment.position];
    }
  );

  const selectedTargets = props.targetSegments.filter(
    (targetSegment: TextSegment) => {
      return selectedTargetTextSegments[targetSegment.position];
    }
  );

  if (selectedSources.length || selectedTargets.length) {
    return (
      <LineView
        displayStyle="partial"
        sourceDirection={'ltr'}
        sourceSegments={selectedSources}
        targetDirection={'rtl'}
        targetSegments={selectedTargets}
      />
    );
  }

  const linksArray = Array.from(focusedLinks ?? []);
  if (linksArray.length) {
    return linksArray.map(
      ([link, bool]): ReactElement => {
        if (bool) {
          return (
            <LineView
              displayStyle="partial"
              sourceDirection={'ltr'}
              sourceSegments={props.sourceSegments.filter(
                (sourceSegment: TextSegment): boolean => {
                  return link.sources.includes(sourceSegment.position);
                }
              )}
              targetDirection={'rtl'}
              targetSegments={props.targetSegments.filter(
                (targetSegment: TextSegment): boolean => {
                  return link.targets.includes(targetSegment.position);
                }
              )}
            />
          );
        }
        return <></>;
      }
    );
  }
  return <p>{'Hover over source or target segments to view links.'}</p>;
};

export const ParagraphView = (props: ParagraphViewProps): ReactElement => {
  const { sourceSegments, targetSegments } = props;

  const { state, dispatch } = useContext(AlignmentContext);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
      <div>
        <div>SOURCE</div>
        <div className="source-container" style={{ overflowY: 'scroll' }}>
          <TextPortionComponent
            displayStyle="paragraph"
            type="source"
            textSegments={sourceSegments}
          />
        </div>

        <br />
        <hr />
        <br />

        <div>TARGET</div>
        <div className="target-container" style={{ overflowY: 'scroll' }}>
          <TextPortionComponent
            displayStyle="paragraph"
            type="target"
            textSegments={targetSegments}
          />
        </div>
      </div>

      <div
        className="alignment-thing"
        style={{
          display: 'grid',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        {singleLinkAlignment(
          props,
          state.focusedLinks,
          state.selectedSourceTextSegments,
          state.selectedTargetTextSegments
        )}
      </div>
    </div>
  );
};

export default ParagraphView;
