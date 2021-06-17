import React, { ReactElement, useContext, useEffect } from 'react';

import { AlignmentContext, AlignmentState } from 'contexts/alignment';

import ParagraphView from 'components/paragraphView';
import LineView from 'components/lineView';
import ControlPanel from 'components/controlPanel';

import { Link, TextSegment, Gloss, StateUpdatedHookType } from 'core/structs';

import './alignmentEditorStyle.scss';

interface AlignmentEditorProps {
  sourceSegments: TextSegment[];
  referenceSegments: TextSegment[];
  targetSegments: TextSegment[];
  sourceGlosses: Gloss[];
  userLinks: Link[];
  referenceLinks: Link[];
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
        referenceSegments={props.referenceSegments}
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
        referenceSegments={props.referenceSegments}
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
  const { userLinks, referenceLinks, sourceGlosses } = props;

  const { state, dispatch } = useContext(AlignmentContext);

  useEffect(() => {
    dispatch({
      type: 'setSourceSegments',
      payload: { sourceSegments: props.sourceSegments },
    });

    dispatch({ type: 'setUserLinks', payload: { userLinks: userLinks ?? [] } });

    if (referenceLinks) {
      dispatch({
        type: 'setReferenceLinks',
        payload: { referenceLinks: referenceLinks ?? null },
      });
    }

    dispatch({ type: 'setSourceGlosses', payload: { sourceGlosses } });
    dispatch({
      type: 'setStateUpdatedHook',
      payload: { stateUpdatedHook: props.stateUpdatedHook },
    });
    // This effect should run as component mounts/unmounts.
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="alignment-editor-root" style={{ width: '100%' }}>
      {selectedView(props, state)}
      <ControlPanel />
    </div>
  );
};

export default AlignmentEditor;
