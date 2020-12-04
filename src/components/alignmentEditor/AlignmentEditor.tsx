import React, { ReactElement, useContext, useEffect } from 'react';

import { AlignmentContext, AlignmentState } from 'contexts/alignment';

import ParagraphView from 'components/paragraphView';
import LineView from 'components/lineView';
import ControlPanel from 'components/controlPanel';

import { Link, TextSegment, StateUpdatedHookType } from 'core/structs';

import 'components/AlignmentEditor/alignmentEditorStyle.scss';

interface AlignmentEditorProps {
  sourceSegments: TextSegment[];
  targetSegments: TextSegment[];
  links: Link[];
  stateUpdatedHook: StateUpdatedHookType;
}

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
    dispatch({
      type: 'setStateUpdatedHook',
      payload: { stateUpdatedHook: props.stateUpdatedHook },
    });
    // This effect should run as component mounts/unmounts.
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="alignment-editor-root">
      {selectedView(props, state)}
      <ControlPanel />
    </div>
  );
};

export default AlignmentEditor;
