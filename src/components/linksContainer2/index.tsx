import React, { ReactElement, useState } from 'react';

import TextPortionComponent from 'components/textPortion';
import LinksContainerComponent from 'components/linksContainer';
import LinkComponent from 'components/link';

import { findLinkForTextSegment } from 'core/findLink';
import { Link, TextSegment, TextSegmentType } from 'core/structs';

type Portion = 'source' | 'target';
type Direction = 'ltr' | 'rtl';

interface LinksContainerProps {
  links: Link[];
  sourceSegments: TextSegment[];
  targetSegments: TextSegment[];
  selectTextSegmentFunc: (type: TextSegmentType, position: number) => void;
  deSelectTextSegmentFunc: (type: TextSegmentType, position: number) => void;
  sourceDirection: Direction;
  targetDirection: Direction;
}

const singleLinkAlignment = (
  props: LinksContainerProps,
  focusedLinks: Map<Link, boolean>
): ReactElement[] | ReactElement => {
  const linksArray = Array.from(focusedLinks ?? []);
  if (linksArray.length) {
    return linksArray.map(
      ([link, bool]): ReactElement => {
        if (bool) {
          return (
            <LinksContainerComponent
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
              selectTextSegmentFunc={props.selectTextSegmentFunc}
              deSelectTextSegmentFunc={props.deSelectTextSegmentFunc}
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

export const LinksContainer2 = (props: LinksContainerProps): ReactElement => {
  const {
    links,
    sourceSegments,
    targetSegments,
    selectTextSegmentFunc,
    deSelectTextSegmentFunc,
  } = props;

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

  const [focusedLinks, setFocusedLinks] = useState<Map<Link, boolean>>(
    new Map<Link, boolean>()
  );

  const setLinkFocused = (link: Link, focused: boolean): void => {
    if (link) {
      const previousState = focusedLinks.get(link);

      if (focused !== previousState) {
        const newState = new Map<Link, boolean>(focusedLinks);
        newState.set(link, focused);
        setFocusedLinks(newState);
      }
    }
  };

  const sillyRerenderTrick = (): void => {
    setTimeout((): void => {
      const newState = new Map<Link, boolean>(focusedLinks);
      setFocusedLinks(newState);
    }, 1);
  };

  const setSegmentFocused = (
    links: Link[],
    textSegment: TextSegment,
    isHovered: boolean
  ): void => {
    const link = findLinkForTextSegment(links, textSegment);
    if (link) {
      setLinkFocused(link, isHovered);
    }
  };

  const [sourceDirection, setSourceDirection] = useState<Direction>('ltr');
  const [targetDirection, setTargetDirection] = useState<Direction>('ltr');

  const toggleDirection = (portion: Portion, oldState: Direction): void => {
    const setter =
      portion === 'source' ? setSourceDirection : setTargetDirection;
    const newDirection = oldState === 'ltr' ? 'rtl' : 'ltr';
    setter(newDirection);
    // WOE is me, for I am undone.
    sillyRerenderTrick();
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '33% 33% 33%' }}>
      <div className="source-container">
        <TextPortionComponent
          textDirectionToggle={false}
          displayStyle="paragraph"
          type="source"
          textSegments={sourceSegments}
          refGatherer={setRef.bind(null, 'source')}
          selectTextSegmentFunc={selectTextSegmentFunc}
          deSelectTextSegmentFunc={deSelectTextSegmentFunc}
          focusedLinks={focusedLinks}
          links={links}
          segmentHovered={setSegmentFocused.bind(null, links)}
          direction={sourceDirection}
          toggleDirection={toggleDirection.bind(null, 'source')}
        />
      </div>

      <div className="target-container">
        <TextPortionComponent
          displayStyle="paragraph"
          textDirectionToggle={false}
          type="target"
          textSegments={targetSegments}
          refGatherer={setRef.bind(null, 'target')}
          selectTextSegmentFunc={selectTextSegmentFunc}
          deSelectTextSegmentFunc={deSelectTextSegmentFunc}
          focusedLinks={focusedLinks}
          links={links}
          segmentHovered={setSegmentFocused.bind(null, links)}
          direction={targetDirection}
          toggleDirection={toggleDirection.bind(null, 'target')}
        />
      </div>

      <div className="alignment-thing" style={{ height: '8rem' }}>
        {singleLinkAlignment(props, focusedLinks)}
      </div>
    </div>
  );
};

export default LinksContainer2;
