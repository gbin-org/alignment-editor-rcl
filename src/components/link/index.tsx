import React, { ReactElement, useState } from 'react';

import './linkStyle.scss';

export interface LinkProps {
  sourcePosition: number;
  targetPosition: number;
  parentRef: HTMLDivElement;
  sourceRef: HTMLDivElement;
  targetRef: HTMLDivElement;
  hoverHook: (isHovered: boolean) => void;
  isFocused: boolean;
}

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

export const LinkComponent = (props: LinkProps): ReactElement => {
  const {
    sourcePosition,
    targetPosition,
    parentRef,
    sourceRef,
    targetRef,
    hoverHook,
    isFocused,
  } = props;
  //const color = this.getColor(sourceRef);
  //const disabled = this.otherLinkSelected(color) ? 'disabled' : '';

  const color = '#c8c8c8';
  const disabled = '';
  const focused = isFocused ? 'focused' : '';
  const name = `source${sourcePosition}-target${targetPosition}`;
  const forceUpdate = useForceUpdate();

  if (parentRef && sourceRef && targetRef) {
    const beginningOffsetX = parentRef.offsetLeft ?? 0;
    const beginningOffsetY = parentRef.offsetTop ?? 0;
    const basePositionX =
      window.pageXOffset -
      document.documentElement.scrollLeft -
      beginningOffsetX;
    const basePositionY =
      window.pageYOffset -
      document.documentElement.scrollTop -
      beginningOffsetY;

    const sourceRect = sourceRef.getBoundingClientRect();
    const targetRect = targetRef.getBoundingClientRect();

    const x1 = basePositionX + sourceRef.offsetLeft + sourceRect.width * 0.5;
    const y1 = basePositionY + sourceRef.offsetTop - sourceRect.height * 0.1;

    const x2 = basePositionX + targetRef.offsetLeft + targetRect.width * 0.5;
    const y2 = basePositionY + targetRef.offsetTop - targetRect.height * 1.8;

    return (
      <svg
        className="link-canvas"
        style={{ overflow: 'visible', position: 'absolute', margin: 'none' }}
      >
        <line
          id={name}
          className={`link ${name} ${color} ${disabled} ${focused}`}
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
          onMouseOver={() => {
            hoverHook(true);
          }}
          onMouseLeave={() => {
            hoverHook(false);
          }}
        />
      </svg>
    );
  }

  return <></>;
};

export default LinkComponent;
