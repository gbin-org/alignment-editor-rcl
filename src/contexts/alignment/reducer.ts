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

export type AlignmentActionTypes =
  | FocusLinkAction
  | UnFocusLinkAction
  | SetLinksAction
  | SwitchViewAction;

export type AlignmentState = {
  focusedLinks: Map<Link, boolean>;
  links: Link[];
  view: ViewType;
};

export const initialState: AlignmentState = {
  focusedLinks: new Map<Link, boolean>(),
  links: [],
  view: 'paragraph',
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
    default:
      return state;
  }
};
