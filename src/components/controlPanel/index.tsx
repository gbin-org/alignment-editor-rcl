import React, { ReactElement, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import { AlignmentContext } from 'contexts/alignment';

import 'components/controlPanel/controlPanelStyle.scss';

interface ControlPanelProps {}

const linkableSegmentsSelected = (
  selectedSourceSegments: Record<number, boolean>,
  selectedTargetSegments: Record<number, boolean>
): boolean => {
  const selectedSources = Object.keys(selectedSourceSegments).find((key) => {
    return selectedSourceSegments[Number(key)];
  });

  const selectedTargets = Object.keys(selectedTargetSegments).find((key) => {
    return selectedTargetSegments[Number(key)];
  });

  return Boolean(selectedSources) && Boolean(selectedTargets);
};

export const ControlPanel = (props: ControlPanelProps): ReactElement => {
  const { state, dispatch } = useContext(AlignmentContext);

  const disabledClass = linkableSegmentsSelected(
    state.selectedSourceTextSegments,
    state.selectedTargetTextSegments
  )
    ? 'active'
    : 'disabled';

  return (
    <div
      className="control-panel"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button
        style={{ cursor: 'pointer', margin: '0.5rem' }}
        onClick={() => {
          const newView = state.view === 'paragraph' ? 'line' : 'paragraph';
          dispatch({ type: 'switchView', payload: { view: newView } });
        }}
      >
        Toggle View Type
      </button>
      <FontAwesomeIcon
        className={`control-panel-button ${disabledClass}`}
        icon={faLink}
        onClick={(): void => {
          const selectedSourceSegments = Object.keys(
            state.selectedSourceTextSegments
          )
            .filter((key) => {
              return state.selectedSourceTextSegments[Number(key)];
            })
            .map((key) => Number(key));

          const selectedTargetSegments = Object.keys(
            state.selectedTargetTextSegments
          )
            .filter((key) => {
              return state.selectedTargetTextSegments[Number(key)];
            })
            .map((key) => Number(key));

          if (selectedSourceSegments.length && selectedTargetSegments.length) {
            dispatch({
              type: 'addLink',
              payload: {
                sources: selectedSourceSegments,
                targets: selectedTargetSegments,
              },
            });
            dispatch({ type: 'redrawUI', payload: {} });
          }
        }}
      />
    </div>
  );
};

export default ControlPanel;
