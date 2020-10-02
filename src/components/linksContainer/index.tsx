import React, { ReactElement, RefObject, useState } from "react";

import { TextSegment } from "../structs/textSegment";
import TextPortion from "../textPortion";
import Link from "../link";

interface LinksContainerProps {
  sourceSegments: TextSegment[];
  targetSegments: TextSegment[];
  selectTextSegmentFunc: (type: "source" | "target", position: number) => void;
  deSelectTextSegmentFunc: (
    type: "source" | "target",
    position: number
  ) => void;
}

export const LinksContainer = (props: LinksContainerProps): ReactElement => {
  const {
    sourceSegments,
    targetSegments,
    selectTextSegmentFunc,
    deSelectTextSegmentFunc,
  } = props;

  const [sourceRefs, setSourceRefs] = useState<Record<number, HTMLDivElement>>(
    {}
  );
  const [targetRefs, setTargetRefs] = useState<Record<number, HTMLDivElement>>(
    {}
  );

  const setRef = (
    type: "source" | "target",
    position: number,
    ref: HTMLDivElement | null
  ): void => {
    if (type === "source" && ref) {
      if (!sourceRefs[position]) {
        const newRefs = { ...sourceRefs };
        newRefs[position] = ref;
        console.log("update source state");
        setSourceRefs(newRefs);
      }
    }

    if (type === "target" && ref) {
      if (!targetRefs[position]) {
        const newRefs = { ...targetRefs };
        newRefs[position] = ref;
        console.log("update target state");
        setTargetRefs(newRefs);
      }
    }
  };

  console.log(sourceRefs);
  return (
    <div>
      <p />
      <p />
      <p />
      <TextPortion
        type="source"
        textSegments={sourceSegments}
        refGatherer={setRef.bind(null, "source")}
        selectTextSegmentFunc={selectTextSegmentFunc}
        deSelectTextSegmentFunc={deSelectTextSegmentFunc}
      />
      <svg style={{ margin: 'none'}}>
        <Link
          sourcePosition={1}
          targetPosition={1}
          sourceRef={sourceRefs[1]}
          targetRef={targetRefs[1]}
        />

        <Link
          sourcePosition={2}
          targetPosition={2}
          sourceRef={sourceRefs[2]}
          targetRef={targetRefs[2]}
        />

        <Link
          sourcePosition={1}
          targetPosition={2}
          sourceRef={sourceRefs[1]}
          targetRef={targetRefs[2]}
        />

        <Link
          sourcePosition={4}
          targetPosition={3}
          sourceRef={sourceRefs[4]}
          targetRef={targetRefs[3]}
        />


      </svg>
      <TextPortion
        type="target"
        textSegments={targetSegments}
        refGatherer={setRef.bind(null, "target")}
        selectTextSegmentFunc={selectTextSegmentFunc}
        deSelectTextSegmentFunc={deSelectTextSegmentFunc}
      />
      <p />
      <p />
      <p />
    </div>
  );
};

export default LinksContainer;
