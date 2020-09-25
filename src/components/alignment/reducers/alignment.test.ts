import reducer, { INIT_STAT } from './alignment';
import * as types from '../types';
import { ManuscriptSuggestions } from '../shared/structs';

describe('Alignment reducer', (): void => {
  it('returns state in default case', (): void => {
    const receives = reducer(undefined, {
      type: undefined,
    });
    expect(receives).toBe(INIT_STAT);
  });

  it('should return state for TRIGGER_ALIGNMENT_FLAG', (): void => {
    const receives = reducer(undefined, {
      type: types.TRIGGER_ALIGNMENT_FLAG,
      verseCode: 'testVerseCode',
    });
    expect(receives.loading).toBe(true);
    expect(receives.alignmentData.testVerseCode).toBe('');
  });

  it('should return state for FETCH_ALIGNMENT_DATA_REQUEST', (): void => {
    const receives = reducer(undefined, {
      type: types.FETCH_ALIGNMENT_DATA_REQUEST,
      projectId: 'testProjectId',
      verseCode: 'testVerseId',
    });
    expect(receives.loading).toBe(true);
    expect(receives.alignmentData.testVerseId).toBe('loading');
  });

  it('should return state for FETCH_ALIGNMENT_DATA_SUCCESS', (): void => {
    const testManuscriptSuggestions: ManuscriptSuggestions = {
      textSuggestion: 'This is my text',
      linkSuggestions: { This: ['that'] },
      memorySuggestions: { g1: [] },
      targetSuggestions: { someText: [] },
    };
    const receives = reducer(undefined, {
      type: types.FETCH_ALIGNMENT_DATA_SUCCESS,
      projectId: 'testProjectId',
      verseCode: 'testVerseId',
      data: testManuscriptSuggestions,
    });
    expect(receives.loading).toBe(false);
    expect(receives.alignmentData.testVerseId).toStrictEqual(testManuscriptSuggestions);
  });

  it('should return state for UPDATE_ALIGNMENT_DATA)', (): void => {
    const receives = reducer(undefined, {
      type: types.UPDATE_ALIGNMENT_DATA,
      verseCode: '1',
      alignmentData: { thing: 'stuff' },
    });
    expect(receives.alignmentData['1']).toEqual({ thing: 'stuff' });
  });

  it('should return state for ADD_LINK', (): void => {
    const receives = reducer(
      {
        reverseAlignmentDisplay: false,
        loading: false,
        isVisible: false,
        alignmentData: { '1': { links: [] } },
        verseCode: '',
        source: [],
        target: [],
        linkSelected: false,
        isRTL: false,
        isNTrtl: false,
        isOTrtl: false,
        isNTltr: false,
        isOTltr: false,
        isNTrtlAlignSource: false,
        isOTrtlAlignSource: false,
        isNTltrAlignSource: false,
        isOTltrAlignSource: false,
        isNTrtlAlignTarget: false,
        isOTrtlAlignTarget: false,
        isNTltrAlignTarget: false,
        isOTltrAlignTarget: false,
        reRenderLinks: new Date().getTime().toString(),
      },
      {
        type: types.ADD_LINK,
        verseCode: '1',
        sources: [0],
        targets: [0],
      },
    );
    expect(receives.alignmentData['1'].links[0].sources).toEqual([0]);
    expect(receives.alignmentData['1'].links[0].targets).toEqual([0]);
  });

  it('should return state for REVERSE_ALIGNMENT_DISPLAY (default state)', (): void => {
    const receives = reducer(undefined, {
      type: types.REVERSE_ALIGNMENT_DISPLAY,
    });
    expect(receives.reverseAlignmentDisplay).toBe(false);
  });

  it('should return state for REVERSE_ALIGNMENT_DISPLAY (false -> true)', (): void => {
    const receives = reducer(
      {
        reverseAlignmentDisplay: false,
        loading: false,
        isVisible: false,
        alignmentData: {},
        verseCode: '',
        source: [],
        target: [],
        linkSelected: false,
        isRTL: false,
        isNTrtl: false,
        isOTrtl: false,
        isNTltr: false,
        isOTltr: false,
        isNTrtlAlignSource: false,
        isOTrtlAlignSource: false,
        isNTltrAlignSource: false,
        isOTltrAlignSource: false,
        isNTrtlAlignTarget: false,
        isOTrtlAlignTarget: false,
        isNTltrAlignTarget: false,
        isOTltrAlignTarget: false,
        reRenderLinks: new Date().getTime().toString(),
      },
      {
        type: types.REVERSE_ALIGNMENT_DISPLAY,
      },
    );
    expect(receives.reverseAlignmentDisplay).toBe(true);
  });

  it('should return state for REVERSE_ALIGNMENT_DISPLAY (true -> false)', (): void => {
    const receives = reducer(
      {
        reverseAlignmentDisplay: true,
        loading: false,
        isVisible: false,
        alignmentData: {},
        verseCode: '',
        source: [],
        target: [],
        linkSelected: false,
        isRTL: false,
        isNTrtl: false,
        isOTrtl: false,
        isNTltr: false,
        isOTltr: false,
        isNTrtlAlignSource: false,
        isOTrtlAlignSource: false,
        isNTltrAlignSource: false,
        isOTltrAlignSource: false,
        isNTrtlAlignTarget: false,
        isOTrtlAlignTarget: false,
        isNTltrAlignTarget: false,
        isOTltrAlignTarget: false,
        reRenderLinks: new Date().getTime().toString(),
      },
      {
        type: types.REVERSE_ALIGNMENT_DISPLAY,
      },
    );
    expect(receives.reverseAlignmentDisplay).toBe(false);
  });

  describe('text segments', (): void => {
    it('can select source segments', (): void => {
      const receives = reducer(undefined, {
        type: types.SELECT_SOURCE_TEXT_SEGMENT,
        position: 0,
      });
      expect(receives.source.length).toBe(1);
      expect(receives.source[0]).toEqual({ position: 0 });
    });
    it('can select target segments', (): void => {
      const receives = reducer(undefined, {
        type: types.SELECT_TARGET_TEXT_SEGMENT,
        position: 0,
      });
      expect(receives.target.length).toBe(1);
      expect(receives.target[0]).toEqual({ position: 0 });
    });
    it('can deselect source segments', (): void => {
      const testState = { ...INIT_STAT, source: [{ position: 1 }] };
      const receives = reducer(testState, {
        type: types.DESELECT_SOURCE_TEXT_SEGMENT,
        position: 1,
      });
      expect(receives.source.length).toBe(0);
    });
    it('can deselect target segments', (): void => {
      const testState = { ...INIT_STAT, target: [{ position: 1 }] };
      const receives = reducer(testState, {
        type: types.DESELECT_TARGET_TEXT_SEGMENT,
        position: 1,
      });
      expect(receives.target.length).toBe(0);
    });
    it('can clear all segment suggestions', (): void => {
      const testState = { ...INIT_STAT, source: [{ position: 2 }], target: [{ position: 1 }] };
      const receives = reducer(testState, {
        type: types.CLEAR_LINK_SELECTION,
      });
      expect(receives.source.length).toBe(0);
      expect(receives.target.length).toBe(0);
    });
    it('remove a link', (): void => {
      const testState = {
        ...INIT_STAT,
        source: [{ position: 2 }],
        target: [{ position: 1 }],
        alignmentData: {
          '123': {
            links: [
              { sources: [2], targets: [1] },
              { sources: [5], targets: [5] },
            ],
          },
        },
      };
      const receives = reducer(testState, {
        type: types.REMOVE_LINK,
        verseCode: '123',
        sourceAlt: [{ position: 2 }],
        targetAlt: [{ position: 1 }],
      });
      expect(receives.source.length).toBe(0);
      expect(receives.target.length).toBe(0);
      expect(receives.alignmentData['123'].links.length).toBe(1);
    });
    it('remove a link that is a double entry', (): void => {
      const testState = {
        ...INIT_STAT,
        source: [{ position: 2 }],
        target: [{ position: 1 }],
        alignmentData: {
          '123': {
            links: [
              { sources: [2], targets: [1] },
              { sources: [5], targets: [5] },
              { sources: [2], targets: [1] },
              { sources: [2], targets: [1] },
            ],
          },
        },
      };
      const receives = reducer(testState, {
        type: types.REMOVE_LINK,
        verseCode: '123',
        sourceAlt: [{ position: 2 }],
        targetAlt: [{ position: 1 }],
      });
      expect(receives.source.length).toBe(0);
      expect(receives.target.length).toBe(0);
      expect(receives.alignmentData['123'].links.length).toBe(1);
    });
    it('fails to remove 2 links at once', (): void => {
      const testState = {
        ...INIT_STAT,
        source: [{ position: 2 }, { position: 5 }],
        target: [{ position: 1 }, { position: 5 }],
        alignmentData: {
          '123': {
            links: [
              { sources: [2], targets: [1] },
              { sources: [5], targets: [5] },
            ],
          },
        },
      };
      const receives = reducer(testState, {
        type: types.REMOVE_LINK,
        verseCode: '123',
        sourceAlt: [],
        targetAlt: [],
      });
      expect(receives.source.length).toBe(0);
      expect(receives.target.length).toBe(0);
      expect(receives.alignmentData['123'].links.length).toBe(2);
    });
  });
});
