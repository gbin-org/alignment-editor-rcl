import React, { useContext } from 'react';

import TextSegmentComponent from 'components/textSegment';

import {
  AlignmentContext,
  AlignmentState,
  AlignmentActionTypes,
} from 'contexts/alignment';
import { TextSegment, Link } from 'core/structs';
import { determineGroup } from 'core/findGroup';

interface TextSegmentWrapperProps {
  textSegment: TextSegment;
  displayStyle: 'line' | 'paragraph';
}

const isSource = (textSegment: TextSegment): boolean => {
  return textSegment && textSegment.type === 'source';
};

const isReference = (textSegment: TextSegment): boolean => {
  return textSegment && textSegment.type === 'reference';
};

const isTarget = (textSegment: TextSegment): boolean => {
  return textSegment && textSegment.type === 'target';
};

const isBridgeMode = (state: AlignmentState): boolean => {
  return Boolean(state.referenceLinks.length);
};

//const determineRelevantLinkSet = (
//state: AlignmentState,
//textSegment: TextSegment
//): Link[] => {
//if (isSource(textSegment) && isBridgeMode(state)) {
//return state.referenceLinks;
//}

//if (isSource(textSegment) && !isBridgeMode(state)) {
//return state.userLinks;
//}

//if (isReference(textSegment)) {
//return state.referenceLinks;
//}

//if (isTarget(textSegment)) {
//return state.userLinks;
//}

//return [];
//};

const isFocused = (
  textSegment: TextSegment,
  state: AlignmentState
): boolean => {
  if (isSource(textSegment) && isBridgeMode(state)) {
    const focusedReferenceLink = Array.from(
      state.focusedReferenceLinks.keys()
    ).find((link: Link) => {
      return link.sources.includes(textSegment.position);
    });

    return Boolean(
      state.focusedReferenceLinks.get(focusedReferenceLink ?? ({} as Link))
    );
  }

  if (isSource(textSegment) && !isBridgeMode(state)) {
    const focusedLink = Array.from(state.focusedUserLinks.keys()).find(
      (link: Link) => {
        return link.sources.includes(textSegment.position);
      }
    );
    return Boolean(state.focusedUserLinks.get(focusedLink ?? ({} as Link)));
  }

  if (isReference(textSegment)) {
    const focusedReferenceLink = Array.from(
      state.focusedReferenceLinks.keys()
    ).find((link: Link) => {
      return link.targets.includes(textSegment.position);
    });

    const focusedUserLink = Array.from(state.focusedUserLinks.keys()).find(
      (link: Link) => {
        return link.sources.includes(textSegment.position);
      }
    );

    return (
      Boolean(
        state.focusedReferenceLinks.get(focusedReferenceLink ?? ({} as Link))
      ) || Boolean(state.focusedUserLinks.get(focusedUserLink ?? ({} as Link)))
    );
  }

  if (isTarget(textSegment)) {
    const focusedUserLink = Array.from(state.focusedUserLinks.keys()).find(
      (link: Link) => {
        return link.targets.includes(textSegment.position);
      }
    );

    return Boolean(state.focusedUserLinks.get(focusedUserLink ?? ({} as Link)));
  }

  return false;
};

const getSegmentSelections = (
  textSegment: TextSegment,
  state: AlignmentState
): Record<number, boolean> => {
  if (isSource(textSegment)) {
    return state.selectedSourceTextSegments;
  }

  if (isReference(textSegment)) {
    return state.selectedReferenceTextSegments;
  }

  if (isTarget(textSegment)) {
    return state.selectedTargetTextSegments;
  }

  return {};
};

const determineRefCollectorActionType = (
  textSegment: TextSegment
): 'addSourceRef' | 'addReferenceRef' | 'addTargetRef' => {
  if (isSource(textSegment)) {
    return 'addSourceRef';
  }

  if (isReference(textSegment)) {
    return 'addReferenceRef';
  }

  return 'addTargetRef';
};

const determineRefCollectorCollection = (
  textSegment: TextSegment,
  state: AlignmentState
): Record<number, HTMLDivElement> => {
  if (isSource(textSegment)) {
    return state.sourceRefs;
  }

  if (isReference(textSegment)) {
    return state.referenceRefs;
  }

  // then isTarget
  return state.targetRefs;
};

const generateRefCollector = (
  textSegment: TextSegment,
  displayStyle: 'line' | 'paragraph',
  state: AlignmentState,
  dispatch: React.Dispatch<AlignmentActionTypes>
): ((ref: HTMLDivElement) => void) => {
  const actionType = determineRefCollectorActionType(textSegment);
  const refCollection = determineRefCollectorCollection(textSegment, state);

  return (ref: HTMLDivElement) => {
    if (ref && displayStyle === 'line')
      if (refCollection[textSegment.position] !== ref) {
        dispatch({
          type: actionType,
          payload: { position: textSegment.position, ref: ref },
        });
      }
  };
};

const determineLinkCheckAttributes = (
  textSegment: TextSegment,
  state: AlignmentState
): { linkSet: Link[]; searchCollection: 'sources' | 'targets' } => {
  if (isSource(textSegment) && isBridgeMode(state)) {
    return { linkSet: state.referenceLinks, searchCollection: 'sources' };
  }

  if (isSource(textSegment) && !isBridgeMode(state)) {
    return { linkSet: state.userLinks, searchCollection: 'sources' };
  }

  //if (isReference(textSegment)) {
  //}

  // else: target
  return { linkSet: state.userLinks, searchCollection: 'targets' };
};

const isLinked = (textSegment: TextSegment, state: AlignmentState): boolean => {
  if (isReference(textSegment)) {
    return (
      Boolean(
        state.referenceLinks.find((link) => {
          return link.targets.includes(textSegment.position);
        })
      ) ||
      Boolean(
        state.userLinks.find((link) => {
          return link.sources.includes(textSegment.position);
        })
      )
    );
  }

  const { linkSet, searchCollection } = determineLinkCheckAttributes(
    textSegment,
    state
  );
  return Boolean(
    linkSet.find((link) => {
      return link[searchCollection].includes(textSegment.position);
    })
  );
};

const group = (textSegment: TextSegment, state: AlignmentState): number => {
  if (isBridgeMode(state)) {
    return 0;
  }
  return determineGroup(state.userLinks, textSegment.position);
};

const isLinkedToSource = (
  textSegment: TextSegment,
  state: AlignmentState
): boolean => {
  if (isReference(textSegment)) {
    return Boolean(
      state.referenceLinks.find((link) => {
        return link.targets.includes(textSegment.position);
      })
    );
  }
  return false;
};

const isLinkedToTarget = (
  textSegment: TextSegment,
  state: AlignmentState
): boolean => {
  if (isReference(textSegment)) {
    return Boolean(
      state.userLinks.find((link) => {
        return link.sources.includes(textSegment.position);
      })
    );
  }

  return false;
};

export const TextSegmentWrapper = (props: TextSegmentWrapperProps) => {
  const { textSegment, displayStyle } = props;
  const { state, dispatch } = useContext(AlignmentContext);

  return (
    <TextSegmentComponent
      key={`${textSegment.type}-${textSegment.position}`}
      textSegment={textSegment}
      isFocused={isFocused(textSegment, state)}
      isDisabled={textSegment.catIsContent === false ?? false}
      isLinked={isLinked(textSegment, state)}
      isLinkedToSource={isLinkedToSource(textSegment, state)}
      isLinkedToTarget={isLinkedToTarget(textSegment, state)}
      isSelected={
        getSegmentSelections(textSegment, state)[textSegment.position] ?? false
      }
      group={group(textSegment, state)}
      displayStyle={displayStyle}
      refCollector={generateRefCollector(
        textSegment,
        displayStyle,
        state,
        dispatch
      )}
    />
  );
};

export default TextSegmentWrapper;