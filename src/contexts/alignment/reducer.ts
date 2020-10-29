import { Link } from 'core/structs';

interface Action {
  type: string;
  payload: Record<any, any>;
}

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

export type AlignmentActionTypes =
  | FocusLinkAction
  | UnFocusLinkAction
  | SetLinksAction;

export type AlignmentState = {
  focusedLinks: Map<Link, boolean>;
  links: Link[];
};

export const initialState: AlignmentState = {
  focusedLinks: new Map<Link, boolean>(),
  links: [],
};

export const reducer = (
  state: AlignmentState,
  action: AlignmentActionTypes
): AlignmentState => {
  switch (action.type) {
    case 'focusLink':
      console.log('focusLink');
      const newFocusedLinks = new Map<Link, boolean>(state.focusedLinks);
      newFocusedLinks.set(action.payload.link, true);
      return { ...state, focusedLinks: newFocusedLinks };
    case 'unFocusLink':
      console.log('unFocusedLink');
      const newUnFocusedLinks = new Map<Link, boolean>(state.focusedLinks);
      newUnFocusedLinks.set(action.payload.link, false);
      return { ...state, focusedLinks: newUnFocusedLinks };
    case 'setLinks':
      return { ...state, links: action.payload.links };
    default:
      return state;
  }
};
