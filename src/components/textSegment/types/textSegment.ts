import { RefObject } from "react";
import { TextSegment } from "../structs/textSegment";

export interface TextSegmentProps {
  theRef: RefObject<HTMLSpanElement>;
  refName: string;
  segmentData: TextSegment;
  selectTextSegmentFunc: (type: "source" | "target", position: number) => void;
  deSelectTextSegmentFunc: (
    type: "source" | "target",
    position: number
  ) => void;
  isDisabled: boolean;
  isSelected: boolean;
  isLinked: boolean;
}

export default TextSegmentProps;
