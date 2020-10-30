import React, { ReactElement, useState, useContext, useEffect } from 'react';

import { AlignmentContext } from 'contexts/alignment';

import TextPortionComponent from 'components/textPortion';
import LineView from 'components/lineView';

import { Link, TextSegment } from 'core/structs';

type Portion = 'source' | 'target';
type Direction = 'ltr' | 'rtl';

interface LinksContainerProps {
  links: Link[];
  sourceSegments: TextSegment[];
  targetSegments: TextSegment[];
  sourceDirection: Direction;
  targetDirection: Direction;
}

const singleLinkAlignment = (
  props: LinksContainerProps,
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
        links={[
          {
            sources: [selectedSources[0]?.position],
            targets: [selectedTargets[0]?.position],
            type: 'manual',
          },
        ]}
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
              links={[link]}
            />
          );
        }
        return <></>;
      }
    );
  }
  return <p>{'Hover over source or target segments to view links.'}</p>;
};

export const ParagraphView = (props: LinksContainerProps): ReactElement => {
  const { links, sourceSegments, targetSegments } = props;

  const sourceRefContainer: Record<number, HTMLDivElement> = {};
  const targetRefContainer: Record<number, HTMLDivElement> = {};

  const [sourceRefs, setSourceRefs] = useState<Record<number, HTMLDivElement>>(
    {}
  );
  const [targetRefs, setTargetRefs] = useState<Record<number, HTMLDivElement>>(
    {}
  );

  const setRef = (
    type: 'source' | 'target',
    position: number,
    ref: HTMLDivElement | null
  ): void => {
    if (type === 'source' && ref) {
      if (!sourceRefs[position]) {
        sourceRefContainer[position] = ref;
        if (Object.keys(sourceRefContainer).length === sourceSegments.length) {
          setSourceRefs(sourceRefContainer);
        }
      }
    }

    if (type === 'target' && ref) {
      if (!targetRefs[position]) {
        targetRefContainer[position] = ref;
        if (Object.keys(targetRefContainer).length === targetSegments.length) {
          setTargetRefs(targetRefContainer);
        }
      }
    }
  };

  const [parentRef, setParentRef] = useState<HTMLDivElement>();

  const gatherParentRef = (ref: HTMLDivElement): void => {
    if (!parentRef && ref) {
      setParentRef(ref);
    }
  };

  const { state, dispatch } = useContext(AlignmentContext);

  useEffect(() => {
    console.log('USE EFFECT paragraph');
    dispatch({ type: 'setLinks', payload: { links } });
  }, []);

  //const sillyRerenderTrick = (): void => {
  //setTimeout((): void => {
  //const newState = new Map<Link, boolean>(focusedLinks);
  //setFocusedLinks(newState);
  //}, 1);
  //};

  const [sourceDirection, setSourceDirection] = useState<Direction>('ltr');
  const [targetDirection, setTargetDirection] = useState<Direction>('ltr');

  const toggleDirection = (portion: Portion, oldState: Direction): void => {
    const setter =
      portion === 'source' ? setSourceDirection : setTargetDirection;
    const newDirection = oldState === 'ltr' ? 'rtl' : 'ltr';
    setter(newDirection);
    // WOE is me, for I am undone.
    //sillyRerenderTrick();
  };

  const [selectedSourceTextSegments, setSelectedSourceTextSegments] = useState<
    Record<number, boolean>
  >({});
  const [selectedTargetTextSegments, setSelectedTargetTextSegments] = useState<
    Record<number, boolean>
  >({});

  const toggleTextSelection = (type: Portion, position: number): void => {
    if (type === 'source') {
      const newState = {
        ...selectedSourceTextSegments,
        [position]: !selectedSourceTextSegments[position],
      };
      setSelectedSourceTextSegments(newState);
    }

    if (type === 'target') {
      const newState = {
        ...selectedTargetTextSegments,
        [position]: !selectedTargetTextSegments[position],
      };
      setSelectedTargetTextSegments(newState);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
      <div>
        <div>SOURCE</div>
        <div
          className="source-container"
          style={{ overflowY: 'scroll', maxHeight: '15rem', margin: '0.5rem' }}
        >
          <TextPortionComponent
            textDirectionToggle={false}
            displayStyle="paragraph"
            type="source"
            textSegments={sourceSegments}
            refGatherer={setRef.bind(null, 'source')}
            links={links}
            direction={sourceDirection}
            toggleDirection={toggleDirection.bind(null, 'source')}
            toggleTextSelectionFunc={toggleTextSelection}
            segmentSelections={selectedSourceTextSegments}
          />
        </div>

        <br />
        <hr />
        <br />

        <div>TARGET</div>
        <div
          className="target-container"
          style={{ overflowY: 'scroll', maxHeight: '15rem', margin: '0.5rem' }}
        >
          <TextPortionComponent
            displayStyle="paragraph"
            textDirectionToggle={false}
            type="target"
            textSegments={targetSegments}
            refGatherer={setRef.bind(null, 'target')}
            links={links}
            direction={targetDirection}
            toggleDirection={toggleDirection.bind(null, 'target')}
            toggleTextSelectionFunc={toggleTextSelection}
            segmentSelections={selectedTargetTextSegments}
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
          selectedSourceTextSegments,
          selectedTargetTextSegments
        )}
      </div>
    </div>
  );
};

export default ParagraphView;
