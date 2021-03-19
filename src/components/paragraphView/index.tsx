import React, { ReactElement, useContext } from 'react';

import { AlignmentContext, AlignmentState } from 'contexts/alignment';

import TextPortionComponent from 'components/textPortion';
import LineView from 'components/lineView';

import { Link, TextSegment } from 'core/structs';
import { findReferenceLinkForUserLink } from 'core/findLink';

type Direction = 'ltr' | 'rtl';

interface ParagraphViewProps {
  sourceSegments: TextSegment[];
  referenceSegments: TextSegment[];
  targetSegments: TextSegment[];
  sourceDirection: Direction;
  targetDirection: Direction;
}

const isBridgeMode = (state: AlignmentState): boolean => {
  return state.referenceLinks !== null;
};

const singleLinkAlignment = (
  props: ParagraphViewProps,
  state: AlignmentState,
  focusedUserLinks: Map<Link, boolean>,
  selectedSourceTextSegments: Record<number, boolean>,
  selectedReferenceTextSegments: Record<number, boolean>,
  selectedTargetTextSegments: Record<number, boolean>
): (ReactElement | null)[] | ReactElement => {
  const selectedSources =
    props.sourceSegments?.filter((sourceSegment: TextSegment) => {
      return selectedSourceTextSegments[sourceSegment.position];
    }) ?? [];

  const selectedReferences =
    props.referenceSegments?.filter((referenceSegment: TextSegment) => {
      return selectedReferenceTextSegments[referenceSegment.position];
    }) ?? [];

  const selectedTargets =
    props.targetSegments?.filter((targetSegment: TextSegment) => {
      return selectedTargetTextSegments[targetSegment.position];
    }) ?? [];

  if (
    selectedSources.length ||
    selectedReferences.length ||
    selectedTargets.length
  ) {
    return (
      <LineView
        displayStyle="partial"
        sourceDirection={'ltr'}
        sourceSegments={selectedSources}
        referenceSegments={selectedReferences}
        targetSegments={selectedTargets}
        targetDirection={'rtl'}
      />
    );
  }

  const linksArray = Array.from(focusedUserLinks ?? []);
  if (linksArray.length) {
    return linksArray.map(([link, bool]): ReactElement | null => {
      const relatedReferenceLink = findReferenceLinkForUserLink(
        state.referenceLinks ?? [],
        link
      );
      if (bool) {
        const relevantLink = isBridgeMode(state) ? relatedReferenceLink : link;
        return (
          <LineView
            key={`${link.sources.toString()}-${link.targets.toString()}`}
            displayStyle="partial"
            sourceDirection={'ltr'}
            sourceSegments={props.sourceSegments.filter(
              (sourceSegment: TextSegment): boolean => {
                return (
                  relevantLink?.sources.includes(sourceSegment.position) ??
                  false
                );
              }
            )}
            referenceSegments={props.referenceSegments?.filter(
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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        gridTemplateRows: '50% 50%',
      }}
    >
      <div>
        <div>SOURCE</div>
        <div
          className="source-container"
          style={{ height: '16rem', overflowY: 'scroll' }}
        >
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
        <div
          className="target-container"
          style={{ height: '16rem', overflowY: 'scroll' }}
        >
          <TextPortionComponent
            displayStyle="paragraph"
            type="target"
            textSegments={targetSegments}
          />
        </div>
      </div>

      <div className="alignment-thing" style={{}}>
        <div style={{ height: '17.1rem' }}>
          <div>BRIDGE</div>

          {(!referenceSegments || !referenceSegments.length) && (
            <p>No bridge text available.</p>
          )}

          {referenceSegments && (
            <div
              className="bridge-container"
              style={{ height: '16rem', overflowY: 'scroll' }}
            >
              <TextPortionComponent
                displayStyle="paragraph"
                type="reference"
                textSegments={referenceSegments}
              />
            </div>
          )}
        </div>

        <br />
        <hr />
        <br />

        <div>
          {singleLinkAlignment(
            props,
            state,
            state.focusedUserLinks,
            state.selectedSourceTextSegments,
            state.selectedReferenceTextSegments,
            state.selectedTargetTextSegments
          )}
        </div>
      </div>
    </div>
  );
};

export default ParagraphView;
