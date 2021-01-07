import {
  Link,
  Gloss,
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

interface FocusLinkAction extends Action {
  type: 'focusLink';
  payload: { link: Link };
}

interface UnFocusLinkAction extends Action {
  type: 'unFocusLink';
  payload: { link: Link };
}

interface SetLinksAction extends Action {
  type: 'setLinks';
  payload: { links: Link[] };
}

interface SwitchViewAction extends Action {
  type: 'switchView';
  payload: { view: ViewType };
}

interface AddSourceRefAction extends Action {
  type: 'addSourceRef';
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
  | FocusLinkAction
  | UnFocusLinkAction
  | SetLinksAction
  | SwitchViewAction
  | AddSourceRefAction
  | AddTargetRefAction
  | AddParentRefAction
  | ChangeSourceTextDirection
  | ChangeTargetTextDirection
  | ToggleSelectedSourceTextSegment
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
  focusedLinks: Map<Link, boolean>;
  links: Link[];
  sourceGlosses: Gloss[];
  view: ViewType;
  displayGlosses: boolean;
  sourceRefs: Record<number, HTMLDivElement>;
  targetRefs: Record<number, HTMLDivElement>;
  parentRef: HTMLDivElement | null;
  sourceTextDirection: 'ltr' | 'rtl';
  targetTextDirection: 'ltr' | 'rtl';
  selectedSourceTextSegments: Record<number, boolean>;
  selectedTargetTextSegments: Record<number, boolean>;
  inProgressLink: Link | null;
  stateUpdatedHook: StateUpdatedHookType | null;
};

export const initialState: AlignmentState = {
  focusedLinks: new Map<Link, boolean>(),
  links: [],
  sourceGlosses: [],
  displayGlosses: true,
  view: 'paragraph',
  sourceRefs: {},
  targetRefs: {},
  parentRef: null,
  sourceTextDirection: 'ltr',
  targetTextDirection: 'ltr',
  selectedSourceTextSegments: {},
  selectedTargetTextSegments: {},
  inProgressLink: null,
  stateUpdatedHook: null,
};

export const baseReducer = (
  state: AlignmentState,
  action: AlignmentActionTypes
): AlignmentState => {
  //console.info('REDUCER', action, state);
  switch (action.type) {
    case 'focusLink':
      const newFocusedLinks = new Map<Link, boolean>(state.focusedLinks);
      newFocusedLinks.set(action.payload.link, true);
      return { ...state, focusedLinks: newFocusedLinks };
    case 'unFocusLink':
      const newUnFocusedLinks = new Map<Link, boolean>(state.focusedLinks);
      newUnFocusedLinks.set(action.payload.link, false);
      return { ...state, focusedLinks: newUnFocusedLinks };
    case 'setLinks':
      return {
        ...state,
        links: action.payload.links.map((link, index) => {
          return { ...link, id: index };
        }),
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
        const existingLink = state.links.find(
          (link) => link.id === action.payload.id
        );
        let newLinks: Link[] = [];

        if (existingLink) {
          newLinks = state.links.map(
            (link): Link => {
              if (link.id === action.payload.id) {
                return { ...action.payload, type: 'manual' };
              }
              return link;
            }
          );
        } else {
          newLinks = state.links.concat({
            id: action.payload.id,
            sources: action.payload.sources,
            targets: action.payload.targets,
            type: 'manual',
          });
        }
        return {
          ...state,
          links: newLinks,
          selectedSourceTextSegments: {},
          selectedTargetTextSegments: {},
          inProgressLink: null,
        };
      })();
    case 'removeLink':
      return {
        ...state,
        inProgressLink: null,
        links: state.links.filter((link) => {
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
            action.payload.type === 'source'
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
