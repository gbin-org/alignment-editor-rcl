import React, { ReactElement, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import { AlignmentContext, AlignmentState } from 'contexts/alignment';

import ParagraphView from 'components/paragraphView';
import LineView from 'components/lineView';

import { Link, TextSegment } from 'core/structs';

import 'components/alignmentEditor/alignmentEditorStyle.scss';

interface AlignmentEditorProps {
  sourceSegments: TextSegment[];
  targetSegments: TextSegment[];
  links: Link[];
}

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

const selectedView = (
  props: AlignmentEditorProps,
  state: AlignmentState
): ReactElement => {
  if (state.view === 'paragraph') {
    return (
      <ParagraphView
        sourceSegments={props.sourceSegments}
        targetSegments={props.targetSegments}
        sourceDirection="ltr"
        targetDirection="ltr"
      />
    );
  }
  if (state.view === 'line') {
    return (
      <LineView
        sourceSegments={props.sourceSegments}
        targetSegments={props.targetSegments}
        sourceDirection="ltr"
        targetDirection="ltr"
        displayStyle="full"
      />
    );
  }
  return <div></div>;
};

export const AlignmentEditor = (props: AlignmentEditorProps): ReactElement => {
  const { links } = props;

  const { state, dispatch } = useContext(AlignmentContext);

  useEffect(() => {
    dispatch({ type: 'setLinks', payload: { links } });
  }, []);

  const disabledClass = linkableSegmentsSelected(
    state.selectedSourceTextSegments,
    state.selectedTargetTextSegments
  )
    ? 'active'
    : 'disabled';
  return (
    <div className="alignment-editor-root">
      {selectedView(props, state)}

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
              dispatch({ type: 'redrawUI', payload: {} });
            }
          }}
        />
      </div>
    </div>
  );
};

export default AlignmentEditor;
