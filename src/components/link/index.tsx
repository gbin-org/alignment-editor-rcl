import React, { RefObject, ReactElement, useState } from "react";

import { TextSegment } from "../structs/textSegment";
import TextPortion from "../textPortion";

import "./linkStyle.scss";

interface LinkProps {
  sourcePosition: number;
  targetPosition: number;
  sourceRef: HTMLDivElement;
  targetRef: HTMLDivElement;
  //sourceSegments: TextSegment[];
  //targetSegments: TextSegment[];
  //selectTextSegmentFunc: (type: "source" | "target", position: number) => void;
  //deSelectTextSegmentFunc: (
  //type: "source" | "target",
  //position: number
  //) => void;
}

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

export const Link = (props: LinkProps): ReactElement => {
  const { sourcePosition, targetPosition, sourceRef, targetRef } = props;
  //const color = this.getColor(sourceRef);
  //const disabled = this.otherLinkSelected(color) ? 'disabled' : '';

  const color = "#c8c8c8";
  const disabled = "";
  const name = `source${sourcePosition}-target${targetPosition}`;
  console.log(sourceRef, targetRef);
  const forceUpdate = useForceUpdate();
  if (sourceRef && targetRef) {

    const sourceRect = sourceRef.getBoundingClientRect();
    const targetRect = targetRef.getBoundingClientRect();

    console.log("window", window.pageXOffset, window.pageYOffset);
    console.log(
      "document",
      document.documentElement.scrollLeft,
      document.documentElement.scrollTop
    );

    // PERHAPS this could be a ref?
    const parent = sourceRef.closest("#alignment-canvas") as HTMLElement;

    const basePositionX = window.pageXOffset - document.documentElement.scrollLeft - (parent?.offsetLeft ?? 0);
    const basePositionY = window.pageYOffset - document.documentElement.scrollTop - (parent?.offsetTop ?? 0);

    const x1 = basePositionX + sourceRef.offsetLeft + sourceRect.width * 0.5;
    const y1 = basePositionY + sourceRef.offsetTop - sourceRect.height * 0.1;

    const x2 = basePositionX + targetRef.offsetLeft + targetRect.width * 0.5;
    const y2 = basePositionY + targetRef.offsetTop - targetRect.height * 1.8;

    console.log('RENDER LINK');
    return (
      <svg
        className="link-canvas"
        style={{ overflow: "visible", position: "absolute", margin: "none" }}
      >
        <line
          id={name}
          className={`link ${name} ${color} ${disabled}`}
          key={name}
          strokeLinecap="round"
          strokeWidth="4"
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={color}
          fill={color}
          onClick={forceUpdate}
        />
      </svg>
    );
  }

  return <></>;
};

export default Link;
