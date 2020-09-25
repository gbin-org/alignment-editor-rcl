import { combineReducers, Reducer, AnyAction } from 'redux';

import {
  AlignmentState,
} from '../types';

import alignment from './alignment';

export interface WholeAppState {
  alignment: AlignmentState;
}
const appReducer = combineReducers({
  alignment,
});

const rootAppReducer: Reducer<any, AnyAction> = (
  state: WholeAppState | undefined,
  action: any,
): any => {
  return appReducer(state, action);
};

export default rootAppReducer;
export type AppState = ReturnType<typeof rootAppReducer>;
