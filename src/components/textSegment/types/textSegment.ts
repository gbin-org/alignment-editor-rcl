import { RefObject } from "react";
import { TextSegment } from "../../structs/textSegment";

export interface TextSegmentProps {
  segmentData: TextSegment;
  refGatherer: (ref: HTMLDivElement | null) => void;
  selectTextSegmentFunc: (type: "source" | "target", position: number) => void;
  deSelectTextSegmentFunc: (
    type: "source" | "target",
    position: number
  ) => void;
  isDisabled: boolean;
  isSelected: boolean;
  isLinked: boolean;
  isFocused: boolean;
}

export default TextSegmentProps;
