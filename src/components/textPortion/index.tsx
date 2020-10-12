import React, { ReactElement } from 'react';

import { findLinkForTextSegment } from 'core/findLink';
import { TextSegment, TextSegmentType, Link } from 'core/structs';
import TextSegmentComponent from 'components/textSegment';

interface TextPortionProps {
  type: TextSegmentType;
  textSegments: TextSegment[];
  refGatherer: (position: number, ref: HTMLDivElement | null) => void;
  selectTextSegmentFunc: (type: TextSegmentType, position: number) => void;
  deSelectTextSegmentFunc: (type: TextSegmentType, position: number) => void;
  links: Link[];
  focusedLinks: Map<Link, boolean>;
  segmentHovered: (textSegment: TextSegment, isHovered: boolean) => void;
}

const isFocused = (
  links: Link[],
  focusedLinks: Map<Link, boolean>,
  textSegment: TextSegment
): boolean => {
  const link = findLinkForTextSegment(links, textSegment);
  if (link && focusedLinks) {
    return focusedLinks.get(link) ?? false;
  }
  return false;
};

export const TextPortion = (props: TextPortionProps): ReactElement => {
  const {
    type,
    refGatherer,
    textSegments,
    selectTextSegmentFunc,
    deSelectTextSegmentFunc,
    links,
    focusedLinks,
    segmentHovered,
  } = props;
  return (
    <div className={`${type}-container`} style={{ whiteSpace: 'nowrap' }}>
      {textSegments.map(
        (textSegment, index): ReactElement => {
          return (
            <TextSegmentComponent
              key={`${type}-${textSegment.position}`}
              refGatherer={refGatherer.bind(null, textSegment.position)}
              segmentData={textSegment}
              isDisabled={textSegment.catIsContent === false ?? false}
              isSelected={false}
              isLinked={Boolean(findLinkForTextSegment(links, textSegment))}
              isFocused={isFocused(links, focusedLinks, textSegment)}
              hoverHook={segmentHovered.bind(null, textSegment)}
              selectTextSegmentFunc={selectTextSegmentFunc}
              deSelectTextSegmentFunc={deSelectTextSegmentFunc}
            />
          );
        }
      )}
    </div>
  );
};

export default TextPortion;
