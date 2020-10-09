import React, { ReactElement, useState } from "react";

import TextPortionComponent from "components/textPortion";
import LinkComponent from "components/link";

import { findLinkForTextSegment } from "core/findLink";
import { Link, TextSegment, TextSegmentType } from "core/structs";

interface LinksContainerProps {
  links: Link[];
  sourceSegments: TextSegment[];
  targetSegments: TextSegment[];
  selectTextSegmentFunc: (type: TextSegmentType, position: number) => void;
  deSelectTextSegmentFunc: (type: TextSegmentType, position: number) => void;
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
        setSourceRefs(newRefs);
      }
    }

    if (type === "target" && ref) {
      if (!targetRefs[position]) {
        const newRefs = { ...targetRefs };
        newRefs[position] = ref;
        setTargetRefs(newRefs);
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

  return (
    <div
      id="alignment-canvas"
      ref={gatherParentRef}
      style={{ overflow: "scroll" }}
    >
      <div style={{ margin: "0.5rem" }} />

      <TextPortionComponent
        type="source"
        textSegments={sourceSegments}
        refGatherer={setRef.bind(null, "source")}
        selectTextSegmentFunc={selectTextSegmentFunc}
        deSelectTextSegmentFunc={deSelectTextSegmentFunc}
        focusedLinks={focusedLinks}
        links={links}
        segmentHovered={setSegmentFocused.bind(null, links)}
      />

      <div id="links-container" style={{ position: "relative" }}>
        {parentRef &&
          links.map((link: Link) => {
            return (
              <LinkComponent
                key={`${link.type}-${link.sources[0]}-${link.targets[0]}`}
                sourcePosition={link.sources[0]}
                targetPosition={link.targets[0]}
                parentRef={parentRef}
                sourceRef={sourceRefs[link.sources[0]]}
                targetRef={targetRefs[link.targets[0]]}
                hoverHook={setLinkFocused.bind(null, link)}
                isFocused={focusedLinks.get(link) ?? false}
              />
            );
          })}
      </div>

      <div style={{ margin: "14rem" }} />

      <TextPortionComponent
        type="target"
        textSegments={targetSegments}
        refGatherer={setRef.bind(null, "target")}
        selectTextSegmentFunc={selectTextSegmentFunc}
        deSelectTextSegmentFunc={deSelectTextSegmentFunc}
        focusedLinks={focusedLinks}
        links={links}
        segmentHovered={setSegmentFocused.bind(null, links)}
      />

      <div style={{ margin: "0.5rem" }} />
    </div>
  );
};

export default LinksContainer;
