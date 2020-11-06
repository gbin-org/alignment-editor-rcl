import React, { ReactElement, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import { AlignmentContext, AlignmentState } from 'contexts/alignment';

import ParagraphView from 'components/paragraphView';
import LineView from 'components/lineView';
import ControlPanel from 'components/controlPanel';

import { Link, TextSegment } from 'core/structs';

import 'components/alignmentEditor/alignmentEditorStyle.scss';

interface AlignmentEditorProps {
  sourceSegments: TextSegment[];
  targetSegments: TextSegment[];
  links: Link[];
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
  }, []);

  return (
    <div className="alignment-editor-root">
      {selectedView(props, state)}
      <ControlPanel />
    </div>
  );
};

export default AlignmentEditor;
