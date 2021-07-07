import React, { ReactElement, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { AlignmentContext, AlignmentState } from 'contexts/alignment';

import TextPortionComponent from 'components/textPortion';
import LineView from 'components/lineView';

import { Link, TextSegment } from 'core/structs';
import {
  findReferenceLinkForUserLink,
  findReferenceLinkForTextSegment,
  findUserLinkForReferenceLink,
} from 'core/findLink';

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

const findPreviousAnchor = (
  anchors: TextSegment[],
  currentPosition: number
): number => {
  const positions = anchors.map((anchor: TextSegment) => {
    return anchor.position;
  });

  const greater = positions.filter((position: number) => {
    return position < currentPosition;
  });

  if (!greater.length) {
    return positions[positions.length - 1];
  }
  return Math.max(...greater);
};

const findNextAnchor = (
  anchors: TextSegment[],
  currentPosition: number
): number => {
  const positions = anchors.map((anchor: TextSegment) => {
    return anchor.position;
  });

  const lesser = positions.filter((position: number) => {
    return position > currentPosition;
  });

  if (!lesser.length) {
    return positions[0];
  }

  return Math.min(...lesser);
};

const determineAnchor = (
  direction: 'previous' | 'next',
  anchors: TextSegment[],
  currentAnchorPosition: number | undefined
): number => {
  if (currentAnchorPosition === undefined) {
    if (direction === 'previous') {
      return anchors[anchors.length - 1].position;
    }

    return anchors[0].position;
  }

  if (direction === 'previous') {
    return findPreviousAnchor(anchors, currentAnchorPosition);
  }

  return findNextAnchor(anchors, currentAnchorPosition);
};

const findCurrentAnchorWord = (
  anchorWords: TextSegment[],
  selectedSourceTextSegments: Record<number, boolean>
): number | undefined => {
  const potentialAnchorWordEntry = Object.entries(
    selectedSourceTextSegments
  ).find((selectedSourceTextSegmentEntry) => {
    return anchorWords.find((anchorWord: TextSegment) => {
      return anchorWord.position === Number(selectedSourceTextSegmentEntry[0]);
    });
  });

  if (potentialAnchorWordEntry) {
    return Number(potentialAnchorWordEntry[0]);
  }

  return undefined;
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

export const GameView = (props: ParagraphViewProps): ReactElement => {
  const { sourceSegments, referenceSegments, targetSegments } = props;
  const { state, dispatch } = useContext(AlignmentContext);

  const anchorWords = sourceSegments.filter(
    (sourceSegment: TextSegment): boolean => {
      const pos = sourceSegment.partOfSpeech;
      return pos === 'noun' || pos === 'verb' || pos === 'adjective';
    }
  );

  const anchorWordCount = anchorWords.length;

  const linkedAnchorWords = anchorWords.filter((anchorWord: TextSegment) => {
    const referenceLink = findReferenceLinkForTextSegment(
      state.referenceLinks || [],
      anchorWord
    );
    let userLink = undefined;
    if (referenceLink) {
      userLink = findUserLinkForReferenceLink(state.userLinks, referenceLink);
    }
    return Boolean(userLink);
  });

  const linkedAnchorWordsCount = linkedAnchorWords.length;

  const currentAnchorWord = findCurrentAnchorWord(
    anchorWords,
    state.selectedSourceTextSegments
  );

  console.log(currentAnchorWord);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        gridTemplateRows: '50% 50%',
      }}
    >
      <div>
        <div>Source</div>

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
          <div>INFO</div>
          <div
            className="previous-anchor"
            onClick={() => {
              dispatch({ type: 'resetSelectedSegments', payload: {} });

              dispatch({
                type: 'selectSourceTextSegment',
                payload: {
                  position: determineAnchor(
                    'previous',
                    anchorWords,
                    currentAnchorWord
                  ),
                },
              });
            }}
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ fontSize: '1rem', marginTop: '-0.5rem' }}
            />
          </div>

          <div
            className="next-anchor"
            onClick={() => {
              dispatch({ type: 'resetSelectedSegments', payload: {} });

              dispatch({
                type: 'selectSourceTextSegment',
                payload: {
                  position: determineAnchor(
                    'next',
                    anchorWords,
                    currentAnchorWord
                  ),
                },
              });
            }}
          >
            <FontAwesomeIcon
              className="next-anchor"
              icon={faArrowRight}
              style={{ fontSize: '1rem', marginTop: '-0.5rem' }}
            />
          </div>

          <div>
            {linkedAnchorWordsCount} / {anchorWordCount} anchor words linked.
          </div>
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

export default GameView;
