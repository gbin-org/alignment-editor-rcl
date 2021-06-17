import React, { ReactElement, useState, useContext } from 'react';

import './linkStyle.scss';

import { AlignmentContext, AlignmentState } from 'contexts/alignment';
import { Link } from 'core/structs';

export interface LinkProps {
  link: Link;
  type: 'user' | 'reference';
  sourcePosition: number;
  targetPosition: number;
}

function useForceUpdate() {
  const [, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

const isFocused = (
  state: AlignmentState,
  type: 'user' | 'reference',
  link: Link
): boolean => {
  if (type === 'user') {
    return Boolean(state.focusedUserLinks.get(link));
  }

  if (type === 'reference') {
    return Boolean(state.focusedReferenceLinks.get(link));
  }

  return false;
};

const determineSourceRefSet = (
  type: 'user' | 'reference',
  state: AlignmentState
): Record<number, HTMLDivElement> | undefined => {
  if (type === 'reference') {
    return state.sourceRefs;
  }

  if (type === 'user' && state.referenceLinks) {
    return state.referenceRefs;
  }

  if (type === 'user' && !state.referenceLinks) {
    return state.sourceRefs;
  }
};

const determineTargetRefSet = (
  type: 'user' | 'reference',
  state: AlignmentState
): Record<number, HTMLDivElement> | undefined => {
  if (type === 'reference') {
    return state.referenceRefs;
  }

  if (type === 'user') {
    return state.targetRefs;
  }
};

export const LinkComponent = (props: LinkProps): ReactElement => {
  const { sourcePosition, targetPosition, link, type } = props;
  const { state, dispatch } = useContext(AlignmentContext);

  const disabled = '';
  const focused = isFocused(state, type, link) ? 'focused' : '';
  const name = `${type}-source${sourcePosition}-target${targetPosition}`;
  const forceUpdate = useForceUpdate();

  const sourceRefSet = determineSourceRefSet(type, state);
  const targetRefSet = determineTargetRefSet(type, state);

  const sourceRef = sourceRefSet ? sourceRefSet[sourcePosition] : null;
  const targetRef = targetRefSet ? targetRefSet[targetPosition] : null;

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
    const y1 = basePositionY + sourceRef.offsetTop - sourceRect.height * 1.2;

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
            if (type === 'user') {
              dispatch({ type: 'focusUserLink', payload: { link } });
            }

            if (type === 'reference') {
              dispatch({ type: 'focusReferenceLink', payload: { link } });
            }
          }}
          onMouseLeave={() => {
            if (type === 'user') {
              dispatch({ type: 'unFocusUserLink', payload: { link } });
            }
            if (type === 'reference') {
              dispatch({ type: 'unFocusReferenceLink', payload: { link } });
            }
          }}
        />
      </svg>
    );
  }

  return <></>;
};

export default LinkComponent;
