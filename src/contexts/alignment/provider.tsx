import React, { ReactNode } from 'react';
import {
  reducer,
  initialState,
  AlignmentState,
  AlignmentActionTypes,
} from 'contexts/alignment/reducer';

type Props = { children: ReactNode };

export * from 'contexts/alignment/reducer';

export const AlignmentContext = React.createContext<{
  state: AlignmentState;
  dispatch: React.Dispatch<AlignmentActionTypes>;
}>({ state: initialState, dispatch: () => null });

export const AlignmentProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AlignmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AlignmentContext.Provider>
  );
};

export default AlignmentProvider;
