import { Link } from 'core/structs';

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

export type AlignmentActionTypes =
  | FocusLinkAction
  | UnFocusLinkAction
  | SetLinksAction
  | SwitchViewAction
  | AddSourceRefAction
  | AddTargetRefAction
  | AddParentRefAction
  | ChangeSourceTextDirection
  | ChangeTargetTextDirection;

export type AlignmentState = {
  focusedLinks: Map<Link, boolean>;
  links: Link[];
  view: ViewType;
  sourceRefs: Record<number, HTMLDivElement>;
  targetRefs: Record<number, HTMLDivElement>;
  parentRef: HTMLDivElement | null;
  sourceTextDirection: 'ltr' | 'rtl';
  targetTextDirection: 'ltr' | 'rtl';
};

export const initialState: AlignmentState = {
  focusedLinks: new Map<Link, boolean>(),
  links: [],
  view: 'paragraph',
  sourceRefs: {},
  targetRefs: {},
  parentRef: null,
  sourceTextDirection: 'ltr',
  targetTextDirection: 'ltr',
};

export const reducer = (
  state: AlignmentState,
  action: AlignmentActionTypes
): AlignmentState => {
  console.log('REDUCER', action, state);
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
      return { ...state, links: action.payload.links };
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

    default:
      return state;
  }
};
