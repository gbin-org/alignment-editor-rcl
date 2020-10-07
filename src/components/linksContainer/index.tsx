import React, { ReactElement, RefObject, useState } from "react";

import { TextSegment } from "../structs/textSegment";
import TextPortion from "../textPortion";
import Link from "../link";

interface Link {
  sources: number[];
  targets: number[];
  type: "manual" | "machine";
}

interface LinksContainerProps {
  links: Link[];
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
    links,
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

  return (
    <div id="alignment-canvas" style={{ overflow: 'scroll'}}>
      <div style={{ margin: "0.5rem" }} />
      <TextPortion
        type="source"
        textSegments={sourceSegments}
        refGatherer={setRef.bind(null, "source")}
        selectTextSegmentFunc={selectTextSegmentFunc}
        deSelectTextSegmentFunc={deSelectTextSegmentFunc}
      />

      <div id="links-container" style={{ position: "relative" }}>
        {links.map((link: Link) => {
          return (
            <Link
              sourcePosition={link.sources[0]}
              targetPosition={link.targets[0]}
              sourceRef={sourceRefs[link.sources[0]]}
              targetRef={targetRefs[link.targets[0]]}
            />
          );
        })}
      </div>

      <div style={{ margin: "14rem" }} />

      <TextPortion
        type="target"
        textSegments={targetSegments}
        refGatherer={setRef.bind(null, "target")}
        selectTextSegmentFunc={selectTextSegmentFunc}
        deSelectTextSegmentFunc={deSelectTextSegmentFunc}
      />
      <div style={{ margin: "0.5rem" }} />
    </div>
  );
};

export default LinksContainer;
