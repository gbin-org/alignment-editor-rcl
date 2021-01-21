import React, { ReactElement, useContext } from 'react';
import GridLayout from 'react-grid-layout';

import { AlignmentContext, AlignmentState } from 'contexts/alignment';

import TextPortionComponent from 'components/textPortion';
import LineView from 'components/lineView';

import { Link, TextSegment } from 'core/structs';
import { findReferenceLinkForUserLink } from 'core/findLink';

type Portion = 'source' | 'target';
type Direction = 'ltr' | 'rtl';

interface ParagraphViewProps {
  sourceSegments: TextSegment[];
  referenceSegments: TextSegment[];
  targetSegments: TextSegment[];
  sourceDirection: Direction;
  targetDirection: Direction;
}

const layout = [
  { i: 'source', x: 0, y: 0, w: 1, h: 1 },
  { i: 'reference', x: 1, y: 0, w: 1, h: 1 },
  { i: 'target', x: 2, y: 0, w: 1, h: 1 },
  { i: 'preview', x: 3, y: 0, w: 1, h: 1 },
];

const singleLinkAlignment = (
  props: ParagraphViewProps,
  state: AlignmentState,
  focusedUserLinks: Map<Link, boolean>,
  selectedSourceTextSegments: Record<number, boolean>,
  selectedReferenceTextSegments: Record<number, boolean>,
  selectedTargetTextSegments: Record<number, boolean>
): (ReactElement | null)[] | ReactElement => {
  const selectedSources = props.sourceSegments.filter(
    (sourceSegment: TextSegment) => {
      return selectedSourceTextSegments[sourceSegment.position];
    }
  );

  //const referenceSegments = props.referenceSegments.filter(
  //(referenceSegment: TextSegment) => {
  //return selectedReferenceTextSegments[referenceSegment.position];
  //}
  //);

  const selectedTargets = props.targetSegments.filter(
    (targetSegment: TextSegment) => {
      return selectedTargetTextSegments[targetSegment.position];
    }
  );

  //if (selectedSources.length || selectedTargets.length) {
  //return (
  //<LineView
  //displayStyle="partial"
  //sourceDirection={'ltr'}
  //sourceSegments={selectedSources}
  //referenceSegments={referenceSegments}
  //targetDirection={'rtl'}
  //targetSegments={selectedTargets}
  ///>
  //);
  //}

  const linksArray = Array.from(focusedUserLinks ?? []);
  if (linksArray.length) {
    return linksArray.map(([link, bool]): ReactElement | null => {
      const relatedReferenceLink = findReferenceLinkForUserLink(
        state.referenceLinks,
        link
      );
      if (bool) {
        return (
          <LineView
            key={`${link.sources.toString()}-${link.targets.toString()}`}
            displayStyle="partial"
            sourceDirection={'ltr'}
            sourceSegments={props.sourceSegments.filter(
              (sourceSegment: TextSegment): boolean => {
                return (
                  relatedReferenceLink?.sources.includes(
                    sourceSegment.position
                  ) ?? false
                );
              }
            )}
            referenceSegments={props.referenceSegments.filter(
              (referenceSegment: TextSegment) => {
                return link.sources.includes(referenceSegment.position);
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
      return null;
    });
  }
  return <p>{'Hover over source or target segments to view links.'}</p>;
};

export const ParagraphView = (props: ParagraphViewProps): ReactElement => {
  const { sourceSegments, referenceSegments, targetSegments } = props;

  const { state } = useContext(AlignmentContext);

  return (
    <GridLayout
      className="paragraph-grid"
      layout={layout}
      cols={4}
      rows={1}
      rowHeight={382}
      width={900}
    >
      <div
        key="source"
        className="source-container"
        style={{ overflowY: 'scroll' }}
      >
        <TextPortionComponent
          displayStyle="paragraph"
          type="source"
          textSegments={sourceSegments}
        />
      </div>

      {referenceSegments && (
        <div
          key="reference"
          className="bridge-container"
          style={{ overflowY: 'scroll' }}
        >
          <TextPortionComponent
            displayStyle="paragraph"
            type="reference"
            textSegments={referenceSegments}
          />
        </div>
      )}

      <div
        key="target"
        className="target-container"
        style={{ overflowY: 'scroll' }}
      >
        <TextPortionComponent
          displayStyle="paragraph"
          type="target"
          textSegments={targetSegments}
        />
      </div>

      <div
        key="preview"
        className="link-preview-container"
        style={{ overflowY: 'scroll' }}
      >
        {singleLinkAlignment(
          props,
          state,
          state.focusedUserLinks,
          state.selectedSourceTextSegments,
          state.selectedReferenceTextSegments,
          state.selectedTargetTextSegments
        )}
      </div>
    </GridLayout>
  );
};

export default ParagraphView;
