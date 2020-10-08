import React, { ReactElement, RefObject } from "react";
import { TextSegment } from "../structs/textSegment";
import TextSegmentComponent from "../textSegment";

interface TextPortionProps {
  type: "source" | "target";
  textSegments: TextSegment[];
  refGatherer: (position:  number, ref: HTMLDivElement | null) => void;
  selectTextSegmentFunc: (type: "source" | "target", position: number) => void;
  deSelectTextSegmentFunc: (
    type: "source" | "target",
    position: number
  ) => void;
}

export const TextPortion = (props: TextPortionProps): ReactElement => {
  const {
    type,
    refGatherer,
    textSegments,
    selectTextSegmentFunc,
    deSelectTextSegmentFunc,
  } = props;
  return (
    <div className={`${type}-container`} style={{whiteSpace: 'nowrap'}}>
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
