import { AlignmentState } from 'contexts/alignment/reducer';

export const updatedState = (state: AlignmentState): AlignmentState => {
  if (state.stateUpdatedHook) {
    state.stateUpdatedHook(state.links);
  }
  return state;
};

export default updatedState;
