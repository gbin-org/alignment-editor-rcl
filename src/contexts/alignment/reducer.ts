import {
  Link,
  Gloss,
  TextSegment,
  TextSegmentType,
  StateUpdatedHookType,
} from 'core/structs';
import { toggleItemExistence } from 'core/toggleItemExistence';
import updatedStateWithHookCall from 'contexts/alignment/updatedStateWithHookCall';

interface Action {
  type: string;
  payload: Record<any, any>;
}

export type ViewType = 'paragraph' | 'line';

interface FocusUserLinkAction extends Action {
  type: 'focusUserLink';
  payload: { link: Link };
}

interface UnFocusUserLinkAction extends Action {
  type: 'unFocusUserLink';
  payload: { link: Link };
}

interface FocusReferenceLinkAction extends Action {
  type: 'focusReferenceLink';
  payload: { link: Link };
}

interface UnFocusReferenceLinkAction extends Action {
  type: 'unFocusReferenceLink';
  payload: { link: Link };
}

interface SetSourceSegmentsAction extends Action {
  type: 'setSourceSegments';
  payload: { sourceSegments: TextSegment[] };
}

interface SetUserLinksAction extends Action {
  type: 'setUserLinks';
  payload: { userLinks: Link[] };
}

interface SetReferenceLinksAction extends Action {
  type: 'setReferenceLinks';
  payload: { referenceLinks: Link[] };
}

interface SwitchViewAction extends Action {
  type: 'switchView';
  payload: { view: ViewType };
}

interface AddSourceRefAction extends Action {
  type: 'addSourceRef';
  payload: { position: number; ref: HTMLDivElement };
}

interface AddReferenceRefAction extends Action {
  type: 'addReferenceRef';
  payload: { position: number; ref: HTMLDivElement };
}

interface AddTargetRefAction extends Action {
  type: 'addTargetRef';
  payload: { position: number; ref: HTMLDivElement };
}

interface AddParentRefAction extends Action {
  type: 'addParentRef';
  payload: { ref: HTMLDivElement };
}

interface ChangeSourceTextDirection extends Action {
  type: 'changeSourceTextDirection';
  payload: { textDirection: 'ltr' | 'rtl' };
}

interface ChangeTargetTextDirection extends Action {
  type: 'changeTargetTextDirection';
  payload: { textDirection: 'ltr' | 'rtl' };
}

interface ToggleSelectedSourceTextSegment extends Action {
  type: 'toggleSelectedSourceTextSegment';
  payload: { position: number };
}

interface ToggleSelectedReferenceTextSegment extends Action {
  type: 'toggleSelectedReferenceTextSegment';
  payload: { position: number };
}

interface ToggleSelectedTargetTextSegment extends Action {
  type: 'toggleSelectedTargetTextSegment';
  payload: { position: number };
}

interface selectSourceTextSegment extends Action {
  type: 'selectSourceTextSegment';
  payload: { position: number };
}

interface selectTargetTextSegment extends Action {
  type: 'selectTargetTextSegment';
  payload: { position: number };
}

interface RedrawUI extends Action {
  type: 'redrawUI';
  payload: {};
}

interface AddLink extends Action {
  type: 'addLink';
  payload: { id: number; sources: number[]; targets: number[] };
}

interface RemoveLink extends Action {
  type: 'removeLink';
  payload: { sources: number[]; targets: number[] };
}

interface ResetSelectedSegments extends Action {
  type: 'resetSelectedSegments';
  payload: {};
}

interface SetInProgressLink extends Action {
  type: 'setInProgressLink';
  payload: Link;
}

interface ToggleInProgressLinkSegment extends Action {
  type: 'toggleInProgressLinkSegment';
  payload: { type: TextSegmentType; position: number };
}

interface SetStateUpdatedHook extends Action {
  type: 'setStateUpdatedHook';
  payload: { stateUpdatedHook: StateUpdatedHookType };
}

interface SetSourceGlosses extends Action {
  type: 'setSourceGlosses';
  payload: { sourceGlosses: Gloss[] };
}

interface SwitchGlossesDisplay extends Action {
  type: 'switchGlossesDisplay';
  payload: { displayGlosses: boolean };
}

export type AlignmentActionTypes =
  | FocusUserLinkAction
  | UnFocusUserLinkAction
  | FocusReferenceLinkAction
  | UnFocusReferenceLinkAction
  | SetSourceSegmentsAction
  | SetUserLinksAction
  | SetReferenceLinksAction
  | SwitchViewAction
  | AddSourceRefAction
  | AddReferenceRefAction
  | AddTargetRefAction
  | AddParentRefAction
  | ChangeSourceTextDirection
  | ChangeTargetTextDirection
  | ToggleSelectedSourceTextSegment
  | ToggleSelectedReferenceTextSegment
  | ToggleSelectedTargetTextSegment
  | selectSourceTextSegment
  | selectTargetTextSegment
  | RedrawUI
  | AddLink
  | RemoveLink
  | ResetSelectedSegments
  | SetInProgressLink
  | ToggleInProgressLinkSegment
  | SetStateUpdatedHook
  | SetSourceGlosses
  | SwitchGlossesDisplay;

export type AlignmentState = {
  sourceSegments: TextSegment[];
  focusedUserLinks: Map<Link, boolean>;
  focusedReferenceLinks: Map<Link, boolean>;
  userLinks: Link[];
  referenceLinks: Link[] | null;
  sourceGlosses: Gloss[];
  view: ViewType;
  displayGlosses: boolean;
  sourceRefs: Record<number, HTMLDivElement>;
  referenceRefs: Record<number, HTMLDivElement>;
  targetRefs: Record<number, HTMLDivElement>;
  parentRef: HTMLDivElement | null;
  sourceTextDirection: 'ltr' | 'rtl';
  targetTextDirection: 'ltr' | 'rtl';
  selectedSourceTextSegments: Record<number, boolean>;
  selectedReferenceTextSegments: Record<number, boolean>;
  selectedTargetTextSegments: Record<number, boolean>;
  inProgressLink: Link | null;
  stateUpdatedHook: StateUpdatedHookType | null;
};

export const initialState: AlignmentState = {
  sourceSegments: [],
  focusedUserLinks: new Map<Link, boolean>(),
  focusedReferenceLinks: new Map<Link, boolean>(),
  userLinks: [],
  referenceLinks: null,
  sourceGlosses: [],
  displayGlosses: true,
  view: 'paragraph',
  sourceRefs: {},
  referenceRefs: {},
  targetRefs: {},
  parentRef: null,
  sourceTextDirection: 'ltr',
  targetTextDirection: 'ltr',
  selectedSourceTextSegments: {},
  selectedReferenceTextSegments: {},
  selectedTargetTextSegments: {},
  inProgressLink: null,
  stateUpdatedHook: null,
};

export const baseReducer = (
  state: AlignmentState,
  action: AlignmentActionTypes
): AlignmentState => {
  // For DEBUG (very handy)
  //console.info('REDUCER', action, state);

  switch (action.type) {
    case 'focusUserLink':
      const newFocusedUserLinks = new Map<Link, boolean>(
        state.focusedUserLinks
      );
      newFocusedUserLinks.set(action.payload.link, true);
      return { ...state, focusedUserLinks: newFocusedUserLinks };
    case 'unFocusUserLink':
      const newUnFocusedUserLinks = new Map<Link, boolean>(
        state.focusedUserLinks
      );
      newUnFocusedUserLinks.set(action.payload.link, false);
      return { ...state, focusedUserLinks: newUnFocusedUserLinks };
    case 'focusReferenceLink':
      const newFocusedReferenceLinks = new Map<Link, boolean>(
        state.focusedReferenceLinks
      );
      newFocusedReferenceLinks.set(action.payload.link, true);
      return { ...state, focusedReferenceLinks: newFocusedReferenceLinks };
    case 'unFocusReferenceLink':
      const newUnFocusedReferenceLinks = new Map<Link, boolean>(
        state.focusedReferenceLinks
      );
      newUnFocusedReferenceLinks.set(action.payload.link, false);
      return { ...state, focusedReferenceLinks: newUnFocusedReferenceLinks };

    case 'setSourceSegments':
      return {
        ...state,
        sourceSegments: action.payload.sourceSegments,
      };
    case 'setUserLinks':
      return {
        ...state,
        userLinks: action.payload.userLinks.map((link, index) => {
          return { ...link, id: index };
        }),
      };
    case 'setReferenceLinks':
      return {
        ...state,
        referenceLinks: action.payload.referenceLinks.map(
          (referenceLink, index) => {
            return { ...referenceLink, id: index };
          }
        ),
      };
    case 'switchView':
      return { ...state, view: action.payload.view };
    case 'addSourceRef':
      return {
        ...state,
        sourceRefs: {
          ...state.sourceRefs,
          [action.payload.position]: action.payload.ref,
        },
      };
    case 'addReferenceRef':
      return {
        ...state,
        referenceRefs: {
          ...state.referenceRefs,
          [action.payload.position]: action.payload.ref,
        },
      };
    case 'addTargetRef':
      return {
        ...state,
        targetRefs: {
          ...state.targetRefs,
          [action.payload.position]: action.payload.ref,
        },
      };
    case 'addParentRef':
      return { ...state, parentRef: action.payload.ref };
    case 'changeSourceTextDirection':
      return { ...state, sourceTextDirection: action.payload.textDirection };
    case 'changeTargetTextDirection':
      return { ...state, targetTextDirection: action.payload.textDirection };
    case 'toggleSelectedSourceTextSegment':
      return {
        ...state,
        selectedSourceTextSegments: {
          ...state.selectedSourceTextSegments,
          [action.payload.position]: !state.selectedSourceTextSegments[
            action.payload.position
          ],
        },
      };
    case 'toggleSelectedReferenceTextSegment':
      return {
        ...state,
        selectedReferenceTextSegments: {
          ...state.selectedReferenceTextSegments,
          [action.payload.position]: !state.selectedReferenceTextSegments[
            action.payload.position
          ],
        },
      };

    case 'toggleSelectedTargetTextSegment':
      return {
        ...state,
        selectedTargetTextSegments: {
          ...state.selectedTargetTextSegments,
          [action.payload.position]: !state.selectedTargetTextSegments[
            action.payload.position
          ],
        },
      };

    case 'selectSourceTextSegment':
      return {
        ...state,
        selectedSourceTextSegments: {
          ...state.selectedSourceTextSegments,
          [action.payload.position]: true,
        },
      };
    case 'selectTargetTextSegment':
      return {
        ...state,
        selectedTargetTextSegments: {
          ...state.selectedTargetTextSegments,
          [action.payload.position]: true,
        },
      };

    case 'redrawUI':
      return { ...state, parentRef: null };
    case 'addLink':
      return ((): AlignmentState => {
        const existingLink = state.userLinks.find(
          (link) => link.id === action.payload.id
        );

        let newLinks: Link[] = [];

        if (existingLink) {
          newLinks = state.userLinks.map(
            (link): Link => {
              if (link.id === action.payload.id) {
                return { ...action.payload, type: 'manual' };
              }
              return link;
            }
          );
        } else {
          newLinks = state.userLinks.concat({
            id: action.payload.id,
            sources: action.payload.sources,
            targets: action.payload.targets,
            type: 'manual',
          });
        }
        return {
          ...state,
          userLinks: newLinks,
          selectedSourceTextSegments: {},
          selectedReferenceTextSegments: {},
          selectedTargetTextSegments: {},
          inProgressLink: null,
        };
      })();
    case 'removeLink':
      return {
        ...state,
        inProgressLink: null,
        userLinks: state.userLinks.filter((link) => {
          const foundSource = link.sources.find((sourcePos) => {
            return action.payload.sources.includes(sourcePos);
          });

          const foundTarget = link.targets.find((targetPos) => {
            return action.payload.targets.includes(targetPos);
          });

          return !(
            typeof foundSource === 'number' || typeof foundTarget === 'number'
          );
        }),
      };

    case 'resetSelectedSegments':
      return {
        ...state,
        selectedSourceTextSegments: {},
        selectedReferenceTextSegments: {},
        selectedTargetTextSegments: {},
        inProgressLink: null,
      };

    case 'setInProgressLink':
      return { ...state, inProgressLink: action.payload };

    case 'toggleInProgressLinkSegment':
      return {
        ...state,
        inProgressLink: {
          id: state.inProgressLink?.id ?? 0, // bug waiting to happen
          sources:
            action.payload.type === 'source' ||
            action.payload.type === 'reference'
              ? toggleItemExistence(
                  state.inProgressLink?.sources,
                  action.payload.position
                )
              : state.inProgressLink?.sources ?? [],
          targets:
            action.payload.type === 'target'
              ? toggleItemExistence(
                  state.inProgressLink?.targets,
                  action.payload.position
                )
              : state.inProgressLink?.targets ?? [],
          type: 'manual',
        },
      };

    case 'setStateUpdatedHook':
      return { ...state, stateUpdatedHook: action.payload.stateUpdatedHook };

    case 'setSourceGlosses':
      return { ...state, sourceGlosses: action.payload.sourceGlosses };

    case 'switchGlossesDisplay':
      return { ...state, displayGlosses: action.payload.displayGlosses };
    default:
      return state;
  }
};

export const reducer = (
  state: AlignmentState,
  action: AlignmentActionTypes
): AlignmentState => {
  const newState = baseReducer(state, action);
  return updatedStateWithHookCall(newState);
};
