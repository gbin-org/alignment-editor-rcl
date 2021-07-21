import React, { ReactElement, useContext, useEffect } from 'react';

import { AlignmentContext, AlignmentState } from 'contexts/alignment';

import ParagraphView from 'components/paragraphView';
import LineView from 'components/lineView';
import ControlPanel from 'components/controlPanel';

import {
  Link,
  UserTextSegment,
  TextSegment,
  Gloss,
  StateUpdatedHookType,
} from 'core/structs';
import { projectUserSegments, projectLinks } from 'core/projectUserArguments';

import './alignmentEditorStyle.scss';

interface AlignmentEditorProps {
  sourceSegments: UserTextSegment[];
  referenceSegments: UserTextSegment[];
  targetSegments: UserTextSegment[];
  sourceGlosses: Gloss[];
  userLinks: Link[];
  referenceLinks: Link[];
  stateUpdatedHook: StateUpdatedHookType;
}

const selectedView = (
  props: AlignmentEditorProps,
  state: AlignmentState,
  projectedSourceSegments: TextSegment[],
  projectedReferenceSegments: TextSegment[],
  projectedTargetSegments: TextSegment[]
): ReactElement => {
  if (state.view === 'paragraph') {
    return (
      <ParagraphView
        sourceSegments={projectedSourceSegments}
        referenceSegments={projectedReferenceSegments}
        targetSegments={projectedTargetSegments}
        sourceDirection="ltr"
        targetDirection="ltr"
      />
    );
  }
  if (state.view === 'line') {
    return (
      <LineView
        sourceSegments={projectedSourceSegments}
        referenceSegments={projectedReferenceSegments}
        targetSegments={projectedTargetSegments}
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

  const projectedSourceSegments = projectUserSegments(
    props.sourceSegments,
    'source'
  );
  const projectedReferenceSegments = projectUserSegments(
    props.referenceSegments,
    'reference'
  );
  const projectedTargetSegments = projectUserSegments(
    props.targetSegments,
    'target'
  );

  useEffect(() => {
    dispatch({
      type: 'setSourceSegments',
      payload: { sourceSegments: projectedSourceSegments },
    });

    dispatch({
      type: 'setUserLinks',
      payload: { userLinks: projectLinks(userLinks) },
    });

    if (referenceLinks) {
      dispatch({
        type: 'setReferenceLinks',
        payload: { referenceLinks: projectLinks(referenceLinks) },
      });
    }

    dispatch({ type: 'setSourceGlosses', payload: { sourceGlosses } });

    dispatch({
      type: 'setStateUpdatedHook',
      payload: { stateUpdatedHook: props.stateUpdatedHook },
    });
    // The props listed here should cover changes in the input.
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [
    props.sourceSegments,
    props.referenceSegments,
    props.targetSegments,
    props.referenceLinks,
    props.userLinks,
    props.sourceGlosses,
    props.stateUpdatedHook,
  ]);

  return (
    <div className="alignment-editor-root" style={{ width: '100%' }}>
      {selectedView(
        props,
        state,
        projectedSourceSegments,
        projectedReferenceSegments,
        projectedTargetSegments
      )}
      <ControlPanel />
    </div>
  );
};

export default AlignmentEditor;
