import { LinkType } from 'core/structs';
import {
  reducer,
  initialState,
  AlignmentActionTypes,
  AlignmentState,
} from 'contexts/alignment/reducer';

describe('AlignmentContextReducer', (): void => {
  describe('addLink', (): void => {
    it('can add a new simple link', (): void => {
      const initialTestState: AlignmentState = {
        ...initialState,
        userLinks: [
          { id: 0, sources: [1], targets: [1], type: 'manual' as LinkType },
        ],
      };
      const addLinkAction: AlignmentActionTypes = {
        type: 'addLink',
        payload: { id: 1, sources: [2], targets: [2] },
      };

      const result = reducer(initialTestState, addLinkAction);

      expect(result.userLinks).toEqual([
        { id: 0, sources: [1], targets: [1], type: 'manual' },
        { id: 1, sources: [2], targets: [2], type: 'manual' },
      ]);
    });

    it('can add a new complex link', (): void => {
      const initialTestState: AlignmentState = {
        ...initialState,
        userLinks: [
          { id: 0, sources: [1], targets: [1], type: 'manual' as LinkType },
        ],
      };

      const addLinkAction: AlignmentActionTypes = {
        type: 'addLink',
        payload: { id: 1, sources: [2, 5], targets: [3, 4, 5, 6] },
      };

      const result = reducer(initialTestState, addLinkAction);

      expect(result.userLinks).toEqual([
        { id: 0, sources: [1], targets: [1], type: 'manual' },
        { id: 1, sources: [2, 5], targets: [3, 4, 5, 6], type: 'manual' },
      ]);
    });

    it('can update/replace an existing simple link', (): void => {
      const initialTestState: AlignmentState = {
        ...initialState,
        userLinks: [
          { id: 0, sources: [1], targets: [1], type: 'manual' as LinkType },
        ],
      };

      const addLinkAction: AlignmentActionTypes = {
        type: 'addLink',
        payload: { id: 0, sources: [1, 2], targets: [1] },
      };

      const result = reducer(initialTestState, addLinkAction);

      expect(result.userLinks).toEqual([
        { id: 0, sources: [1, 2], targets: [1], type: 'manual' },
      ]);
    });

    it('calls stateUpdatedHook when link is added', (): void => {
      const mockStateUpdatedHook = jest.fn();

      const initialTestState: AlignmentState = {
        ...initialState,
        userLinks: [
          { id: 0, sources: [1], targets: [1], type: 'manual' as LinkType },
        ],
        stateUpdatedHook: mockStateUpdatedHook,
      };

      const addLinkAction: AlignmentActionTypes = {
        type: 'addLink',
        payload: { id: 1, sources: [2], targets: [2] },
      };

      reducer(initialTestState, addLinkAction);

      expect(mockStateUpdatedHook).toHaveBeenCalledWith([
        { id: 0, sources: [1], targets: [1], type: 'manual' },
        { id: 1, sources: [2], targets: [2], type: 'manual' },
      ]);
    });

    it('calls stateUpdatedHook only once', (): void => {
      const mockStateUpdatedHook = jest.fn();

      const initialTestState: AlignmentState = {
        ...initialState,
        userLinks: [
          { id: 0, sources: [1], targets: [1], type: 'manual' as LinkType },
        ],
        stateUpdatedHook: mockStateUpdatedHook,
      };

      const addLinkAction: AlignmentActionTypes = {
        type: 'addLink',
        payload: { id: 1, sources: [2], targets: [2] },
      };

      reducer(initialTestState, addLinkAction);

      expect(mockStateUpdatedHook).toHaveBeenCalledTimes(1);
    });
  });

  describe('removeLink', (): void => {
    it('can remove a simple link', (): void => {
      const initialTestState: AlignmentState = {
        ...initialState,
        userLinks: [
          { id: 0, sources: [1], targets: [1], type: 'manual' as LinkType },
          { id: 1, sources: [5], targets: [8], type: 'manual' as LinkType },
        ],
      };

      const removeLinkAction: AlignmentActionTypes = {
        type: 'removeLink',
        payload: { sources: [1], targets: [1] },
      };

      const result = reducer(initialTestState, removeLinkAction);

      expect(result.userLinks).toEqual([
        { id: 1, sources: [5], targets: [8], type: 'manual' },
      ]);
    });

    it('can remove a complex link', (): void => {
      const initialTestState: AlignmentState = {
        ...initialState,
        userLinks: [
          {
            id: 0,
            sources: [1, 2],
            targets: [4, 5],
            type: 'manual' as LinkType,
          },
          { id: 1, sources: [5], targets: [8], type: 'manual' as LinkType },
          { id: 2, sources: [16], targets: [3, 4], type: 'manual' as LinkType },
        ],
      };

      const removeLinkAction: AlignmentActionTypes = {
        type: 'removeLink',
        payload: { sources: [5], targets: [8] },
      };

      const result = reducer(initialTestState, removeLinkAction);

      expect(result.userLinks).toEqual([
        { id: 0, sources: [1, 2], targets: [4, 5], type: 'manual' },
        { id: 2, sources: [16], targets: [3, 4], type: 'manual' },
      ]);
    });
  });
});
