import React, { ReactElement, RefObject } from "react";

import { findLinkForTextSegment } from "../../core/findLink";
import { TextSegment } from "../structs/textSegment";
import TextSegmentComponent from "../textSegment";

type TextSegmentType = "source" | "target";

type LinkType = "manual" | "machine";

interface Link {
  sources: number[];
  targets: number[];
  type: LinkType;
}

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
    <div className={`${type}-container`} style={{ whiteSpace: "nowrap" }}>
      {textSegments.map(
        (textSegment, index): ReactElement => {
          return (
            <TextSegmentComponent
              key={`${type}-${textSegment.position}`}
              refGatherer={refGatherer.bind(null, textSegment.position)}
              segmentData={textSegment}
              isDisabled={textSegment.catIsContent === false ?? false}
              isSelected={false}
              isLinked={false}
              isFocused={isFocused(
                links,
                focusedLinks,
                textSegment
              )}
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
