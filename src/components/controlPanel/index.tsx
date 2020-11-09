import React, { ReactElement, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLink,
  faUnlink,
  faGripLines,
  faParagraph,
  faArrowsAltH,
  faBullseye,
  faScroll,
} from '@fortawesome/free-solid-svg-icons';

import {
  AlignmentContext,
  AlignmentState,
  AlignmentActionTypes,
} from 'contexts/alignment';

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

const toggleTextDirection = (
  textType: 'source' | 'target',
  state: AlignmentState,
  dispatch: React.Dispatch<AlignmentActionTypes>
): void => {
  if (textType === 'source') {
    const newDirection = state.sourceTextDirection === 'ltr' ? 'rtl' : 'ltr';
    dispatch({
      type: 'changeSourceTextDirection',
      payload: { textDirection: newDirection },
    });
  }

  if (textType === 'target') {
    const newDirection = state.targetTextDirection === 'ltr' ? 'rtl' : 'ltr';
    dispatch({
      type: 'changeTargetTextDirection',
      payload: { textDirection: newDirection },
    });
  }

  dispatch({ type: 'redrawUI', payload: {} });
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

        <div
          className="other-controls"
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              alignContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              toggleTextDirection('source', state, dispatch);
            }}
          >
            <FontAwesomeIcon
              className="control-panel-button active"
              icon={faScroll}
            />
            <FontAwesomeIcon
              className="control-panel-button active"
              icon={faArrowsAltH}
              style={{ fontSize: '1rem', marginTop: '-0.5rem' }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              alignContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              toggleTextDirection('target', state, dispatch);
            }}
          >
            <FontAwesomeIcon
              className="control-panel-button active"
              icon={faBullseye}
            />
            <FontAwesomeIcon
              className="control-panel-button active"
              icon={faArrowsAltH}
              style={{ fontSize: '1rem', marginTop: '-0.5rem' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
