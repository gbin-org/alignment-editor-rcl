import React, { ReactElement, useState, useContext } from 'react';

import './linkStyle.scss';

import { AlignmentContext } from 'contexts/alignment';
import { Link } from 'core/structs';

export interface LinkProps {
  link: Link;
  sourcePosition: number;
  targetPosition: number;
}

function useForceUpdate() {
  const [, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

export const LinkComponent = (props: LinkProps): ReactElement => {
  const { sourcePosition, targetPosition, link } = props;
  const { state, dispatch } = useContext(AlignmentContext);
  //const color = this.getColor(sourceRef);
  //const disabled = this.otherLinkSelected(color) ? 'disabled' : '';

  //const color = '#c8c8c8';
  const disabled = '';
  const focused = state.focusedUserLinks.get(link) ? 'focused' : '';
  const name = `source${sourcePosition}-target${targetPosition}`;
  const forceUpdate = useForceUpdate();

  const sourceRef = state.sourceRefs[sourcePosition];
  const targetRef = state.targetRefs[targetPosition];
  const parentRef = state.parentRef;

  if (parentRef && sourceRef && targetRef) {
    const parentOffsetX = parentRef.offsetLeft ?? 0;
    const parentOffsetY = parentRef.offsetTop ?? 0;

    const beginningOffsetX = parentOffsetX;
    const beginningOffsetY = parentOffsetY;

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
    const y1 = basePositionY + sourceRef.offsetTop - sourceRect.height * 1.5;

    const x2 = basePositionX + targetRef.offsetLeft + targetRect.width * 0.5;
    const y2 = basePositionY + targetRef.offsetTop - targetRect.height * 1.8;

    return (
      <svg
        className="link-canvas"
        style={{ overflow: 'visible', position: 'absolute', margin: 'none' }}
      >
        <line
          id={name}
          className={`link ${name} ${disabled} ${focused}`}
          key={name}
          strokeLinecap="round"
          strokeWidth="4"
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          onClick={forceUpdate}
          onMouseOver={() => {
            dispatch({ type: 'focusLink', payload: { link } });
          }}
          onMouseLeave={() => {
            dispatch({ type: 'unFocusLink', payload: { link } });
          }}
        />
      </svg>
    );
  }

  return <></>;
};

export default LinkComponent;
