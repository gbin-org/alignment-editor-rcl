import React, { ReactElement } from "react";
import { TextSegment } from "../structs/textSegment";
import TextSegmentComponent from "../textSegment";

interface TextPortionProps {
  type: "source" | "target";
  textSegments: TextSegment[];
  selectTextSegmentFunc: (type: "source" | "target", position: number) => void;
  deSelectTextSegmentFunc: (
    type: "source" | "target",
    position: number
  ) => void;
}

export const TextPortion = (props: TextPortionProps): ReactElement => {
  const {
    type,
    textSegments,
    selectTextSegmentFunc,
    deSelectTextSegmentFunc,
  } = props;
  return (
    <div className={`${type}-container`}>
      {textSegments.map(
        (textSegment): ReactElement => {
          const ref = React.createRef<HTMLSpanElement>();
          return (
            <TextSegmentComponent
              theRef={ref}
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
