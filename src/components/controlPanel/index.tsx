import React, { ReactElement, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLink,
  faUnlink,
  faGripLines,
  faParagraph,
} from '@fortawesome/free-solid-svg-icons';

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
    <div>
      <br />
      <hr />
      <div
        className="control-panel"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          className="view-controls"
          style={{ justifySelf: 'flex-start', alignSelf: 'flex-start' }}
        >
          <FontAwesomeIcon
            icon={faParagraph}
            className={`control-panel-button view ${
              state.view === 'paragraph' ? 'selected' : 'active'
            }`}
            style={{}}
            onClick={() => {
              dispatch({ type: 'switchView', payload: { view: 'paragraph' } });
            }}
          />

          <FontAwesomeIcon
            icon={faGripLines}
            className={`control-panel-button view ${
              state.view === 'line' ? 'selected' : 'active'
            }`}
            style={{}}
            onClick={() => {
              dispatch({ type: 'switchView', payload: { view: 'line' } });
            }}
          />
        </div>

        <div
          className="link-controls"
          style={{ alignSelf: 'center', justifySelf: 'center' }}
        >
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

              if (
                selectedSourceSegments.length &&
                selectedTargetSegments.length
              ) {
                dispatch({
                  type: 'addLink',
                  payload: {
                    sources: selectedSourceSegments,
                    targets: selectedTargetSegments,
                  },
                });
              }
            }}
          />

          <FontAwesomeIcon
            className={`control-panel-button ${
              state.inProgressLink ? 'active' : 'disabled'
            }`}
            icon={faUnlink}
            onClick={(): void => {
              console.log(state.inProgressLink);
              if (state.inProgressLink) {
                dispatch({
                  type: 'removeLink',
                  payload: {
                    sources: state.inProgressLink.sources,
                    targets: state.inProgressLink.targets,
                  },
                });
                dispatch({ type: 'resetSelectedSegments', payload: {} });
              }
            }}
          />
        </div>

        <div className="other-controls">
          <FontAwesomeIcon
            className="control-panel-button"
            icon={faLink}
            style={{ color: 'white', background: 'white' }}
          />
          <FontAwesomeIcon
            className="control-panel-button"
            icon={faLink}
            style={{ color: 'white', background: 'white' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
