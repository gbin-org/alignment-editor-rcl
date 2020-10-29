import React, { ReactElement, useState, useContext, useEffect } from 'react';

import { AlignmentContext } from 'contexts/alignment';

import TextPortionComponent from 'components/textPortion';
import LinkComponent from 'components/link';

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
  displayStyle: 'full' | 'partial';
}

const fullDisplayStyle = { margin: '14rem' };
const partialDisplayStyle = { margin: '10rem' };

export const LinksContainer = (props: LinksContainerProps): ReactElement => {
  const {
    links,
    sourceSegments,
    targetSegments,
    selectTextSegmentFunc,
    deSelectTextSegmentFunc,
  } = props;

  const { state, dispatch } = useContext(AlignmentContext);

  useEffect(() => {
    dispatch({ type: 'setLinks', payload: { links } });
  }, [links, dispatch]);

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
          console.log('set source refs', sourceRefContainer);
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

  //const [focusedLinks, setFocusedLinks] = useState<Map<Link, boolean>>(
  //new Map<Link, boolean>()
  //);

  //const setLinkFocused = (link: Link, focused: boolean): void => {
  //if (link) {
  //const previousState = focusedLinks.get(link);

  //if (focused !== previousState) {
  //const newState = new Map<Link, boolean>(focusedLinks);
  //newState.set(link, focused);
  //setFocusedLinks(newState);
  //}
  //}
  //};

  //const sillyRerenderTrick = (): void => {
  //setTimeout((): void => {
  //const newState = new Map<Link, boolean>(focusedLinks);
  //setFocusedLinks(newState);
  //}, 1);
  //};

  //const setSegmentFocused = (
  //links: Link[],
  //textSegment: TextSegment,
  //isHovered: boolean
  //): void => {
  //const link = findLinkForTextSegment(links, textSegment);
  //if (link) {
  //if (isHovered) {
  //dispatch({ type: 'focusLink', payload: { link } });
  //}
  //dispatch({ type: 'unFocusLink', payload: { link } });
  //}
  //}k;

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

  const configuredStyle =
    props.displayStyle === 'full' ? fullDisplayStyle : partialDisplayStyle;
  const textDirectionToggle = props.displayStyle === 'full' ? true : false;
  console.log(parentRef, links);
  return (
    <div
      id="alignment-canvas"
      ref={gatherParentRef}
      style={{ overflow: 'scroll' }}
    >
      <div style={{ margin: '0.6rem' }} />

      <TextPortionComponent
        type="source"
        displayStyle="line"
        textDirectionToggle={textDirectionToggle}
        textSegments={sourceSegments}
        refGatherer={setRef.bind(null, 'source')}
        selectTextSegmentFunc={selectTextSegmentFunc}
        deSelectTextSegmentFunc={deSelectTextSegmentFunc}
        links={links}
        direction={sourceDirection}
        toggleDirection={toggleDirection.bind(null, 'source')}
        toggleTextSelectionFunc={toggleTextSelection}
        segmentSelections={selectedSourceTextSegments}
      />

      <div id="links-container" style={{ position: 'relative' }}>
        {parentRef &&
          links.map((link: Link) => {
            console.log('map a link', link);
            return (
              <LinkComponent
                key={`${link.type}-${link.sources[0]}-${link.targets[0]}`}
                link={link}
                sourcePosition={link.sources[0]}
                targetPosition={link.targets[0]}
                parentRef={parentRef}
                sourceRef={sourceRefs[link.sources[0]]}
                targetRef={targetRefs[link.targets[0]]}
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
        refGatherer={setRef.bind(null, 'target')}
        selectTextSegmentFunc={selectTextSegmentFunc}
        deSelectTextSegmentFunc={deSelectTextSegmentFunc}
        links={links}
        direction={targetDirection}
        toggleDirection={toggleDirection.bind(null, 'target')}
        toggleTextSelectionFunc={toggleTextSelection}
        segmentSelections={selectedTargetTextSegments}
      />

      <div style={{ margin: '0.5rem' }} />
    </div>
  );
};

export default LinksContainer;
