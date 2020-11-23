import { AlignmentState } from 'contexts/alignment/reducer';
import { Link } from 'core/structs';

let lastLinksInstance: Link[] = [];

export const updatedState = (state: AlignmentState): AlignmentState => {
  if (state.stateUpdatedHook && lastLinksInstance !== state.links) {
    lastLinksInstance = state.links;
    state.stateUpdatedHook(state.links);
  }
  return state;
};

export default updatedState;
