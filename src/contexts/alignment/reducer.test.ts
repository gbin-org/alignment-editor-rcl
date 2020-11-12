import { LinkType } from 'core/structs';
import {
  reducer,
  initialState,
  AlignmentActionTypes,
} from 'contexts/alignment/reducer';

describe('AlignmentContextReducer', (): void => {
  describe('addLink', (): void => {
    it('can add a new simple link', (): void => {
      const initialTestState = {
        ...initialState,
        links: [
          { id: 0, sources: [1], targets: [1], type: 'manual' as LinkType },
        ],
      };
      const addLinkAction: AlignmentActionTypes = {
        type: 'addLink',
        payload: { id: 1, sources: [2], targets: [2] },
      };

      const result = reducer(initialTestState, addLinkAction);

      expect(result.links).toEqual([
        { id: 0, sources: [1], targets: [1], type: 'manual' },
        { id: 1, sources: [2], targets: [2], type: 'manual' },
      ]);
    });

    it('can add a new complex link', (): void => {
      const initialTestState = {
        ...initialState,
        links: [
          { id: 0, sources: [1], targets: [1], type: 'manual' as LinkType },
        ],
      };

      const addLinkAction: AlignmentActionTypes = {
        type: 'addLink',
        payload: { id: 1, sources: [2, 5], targets: [3, 4, 5, 6] },
      };

      const result = reducer(initialTestState, addLinkAction);

      expect(result.links).toEqual([
        { id: 0, sources: [1], targets: [1], type: 'manual' },
        { id: 1, sources: [2, 5], targets: [3, 4, 5, 6], type: 'manual' },
      ]);
    });

    it('can update/replace an existing simple link', (): void => {
      const initialTestState = {
        ...initialState,
        links: [
          { id: 0, sources: [1], targets: [1], type: 'manual' as LinkType },
        ],
      };

      const addLinkAction: AlignmentActionTypes = {
        type: 'addLink',
        payload: { id: 0, sources: [1, 2], targets: [1] },
      };

      const result = reducer(initialTestState, addLinkAction);

      console.log(result.links);

      expect(result.links).toEqual([
        { id: 0, sources: [1, 2], targets: [1], type: 'manual' },
      ]);
    });
  });
});
