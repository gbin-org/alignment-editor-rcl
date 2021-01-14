import { AlignmentState } from 'contexts/alignment/reducer';
import { Link } from 'core/structs';

let lastLinksInstance: Link[] = [];

export const updatedState = (state: AlignmentState): AlignmentState => {
  if (state.stateUpdatedHook && lastLinksInstance !== state.userLinks) {
    lastLinksInstance = state.userLinks;
    state.stateUpdatedHook(state.userLinks);
  }
  return state;
};

export default updatedState;
