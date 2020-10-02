import React, { RefObject, ReactElement, useState } from "react";

import { TextSegment } from "../structs/textSegment";
import TextPortion from "../textPortion";

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

export const Link = (props: LinkProps): ReactElement => {
  const { sourcePosition, targetPosition, sourceRef, targetRef } = props;
  //const color = this.getColor(sourceRef);
  //const disabled = this.otherLinkSelected(color) ? 'disabled' : '';

  const color = "black";
  const disabled = "";
  const name = `source${sourcePosition}-target${targetPosition}`;
  console.log(sourceRef, targetRef);
  if (sourceRef && targetRef) {
    //console.log('compute source', sourceRef.clientLeft, sourceRef.clientTop);
    //console.log('compute target', targetRef.offsetLeft, targetRef.offsetTop);
    //console.log('woah', sourceRef.getBoundingClientRect());

    const sourceRect = sourceRef.getBoundingClientRect();
    const targetRect = targetRef.getBoundingClientRect();

    if (targetPosition === 2) {
      console.log('Target 2 rect:');
      console.log(targetRef.getBoundingClientRect());

    }

    console.log("window", window.pageXOffset, window.pageYOffset);
    console.log(
      "document",
      document.documentElement.scrollLeft,
      document.documentElement.scrollTop
    );

    //const x1 = sourceRect.left + (sourceRect.width * 0.5) - 312;
    //const y1 = sourceRect.top + (sourceRect.height) - 300;

    //const x2 = targetRect.left + (targetRect.width * 1) - 312;
    //const y2 = targetRect.top + (targetRect.height) - 150;


    const x1 = (sourceRect.x + (sourceRect.width * 0.5)) - 312;
    const y1 = sourceRef.offsetTop - 250;

    const x2 = (targetRect.x + (targetRect.width * 0.5)) - 312;
    const y2 = targetRef.offsetTop - 270;


    //const xSource = sourceRect.right;
    //const ySource = sourceRect.bottom;
    //const xTarget = targetRect.left;
    //const yTarget = targetRect.top;
    return (
        <line
          className={`link ${name} ${color} ${disabled}`}
          key={name}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          strokeWidth="5"
          stroke={color}
          onClick={(): void => {}}
        />
    );
  }

  return <></>;
};

export default Link;
