import React, { ReactElement, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import { AlignmentContext, AlignmentState } from 'contexts/alignment';

import ParagraphView from 'components/paragraphView';
import LineView from 'components/lineView';
import TreeView from 'components/treeView';
import ControlPanel from 'components/controlPanel';

import {
  Link,
  UserTextSegment,
  TextSegment,
  Gloss,
  Strong,
  StateUpdatedHookType,
  SyntaxNode,
} from 'core/structs';
import { projectUserSegments, projectLinks } from 'core/projectUserArguments';

import './alignmentEditorStyle.scss';

interface AlignmentEditorProps {
  sourceSegments: UserTextSegment[];
  referenceSegments: UserTextSegment[];
  targetSegments: UserTextSegment[];
  sourceSyntax: SyntaxNode;
  sourceGlosses: Gloss[];
  sourceStrongs: Strong[];
  userLinks: Link[];
  referenceLinks: Link[];
  stateUpdatedHook: StateUpdatedHookType;
  defaultView?: 'paragraph' | 'line' | 'tree';
  answer?: Link[];
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

  if (state.view === 'tree' && props.sourceSyntax) {
    return (
      <TreeView
        sourceSegments={projectedSourceSegments}
        referenceSegments={projectedReferenceSegments}
        sourceSyntax={props.sourceSyntax}
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
  const {
    userLinks,
    referenceLinks,
    sourceGlosses,
    sourceStrongs,
    sourceSyntax,
    defaultView,
    answer,
  } = props;

  console.log('sourceSyntax', sourceSyntax);

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
    dispatch({ type: 'setSourceStrongs', payload: { sourceStrongs } });

    console.log('set source STRONG', sourceStrongs);

    dispatch({
      type: 'setStateUpdatedHook',
      payload: { stateUpdatedHook: props.stateUpdatedHook },
    });

    if (defaultView) {
      dispatch({ type: 'switchView', payload: { view: defaultView } });
    }

    if (answer) {
      dispatch({ type: 'setAnswer', payload: { answer } });
      dispatch({ type: 'toggleQuizMode', payload: { quizMode: true } });
    }
    return function cleanup() {
      dispatch({ type: 'initializeAllFocus', payload: {} });
    };
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
    <div
      className="alignment-editor-root"
      style={{
        width: '100%',
        position: 'relative',
      }}
    >
      {state.answerCorrect === true && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            height: '80%',
            opacity: '0.95',
            background: 'green',
            position: 'absolute',
            zIndex: 10000,
            color: 'white',
            marginTop: '1%',
            marginLeft: '10%',
            borderRadius: '0.5rem',
            fontSize: '5rem',
          }}
        >
          <FontAwesomeIcon icon={faCheck} style={{ fontSize: '8rem' }} />
        </div>
      )}

      {state.answerCorrect === false && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            height: '80%',
            opacity: '0.95',
            background: 'red',
            position: 'absolute',
            zIndex: 10000,
            color: 'white',
            marginTop: '1%',
            marginLeft: '10%',
            borderRadius: '0.5rem',
            fontSize: '5rem',
          }}
        >
          <FontAwesomeIcon icon={faTimes} style={{ fontSize: '8rem' }} />
        </div>
      )}
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
