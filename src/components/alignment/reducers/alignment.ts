import * as _ from 'lodash';

import * as types from '../types';
import { SelectedTextSegment } from '../structs';

export const INIT_STAT: types.AlignmentState = {
  loading: true,
  isVisible: false,
  alignmentData: {},
  verseCode: '',
  source: new Array<SelectedTextSegment>(),
  target: new Array<SelectedTextSegment>(),
  linkSelected: false,
  reverseAlignmentDisplay: true,
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
};

export default (
  state = INIT_STAT,
  action: types.AlignmentActionTypes
): types.AlignmentState => {
  switch (action.type) {
    case types.FETCH_ALIGNMENT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        alignmentData: {
          ...state.alignmentData,
          [action.verseCode]: 'loading',
        },
      };
    case types.FETCH_ALIGNMENT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        alignmentData: {
          ...state.alignmentData,
          [action.verseCode]: action.data,
        },
      };
    case types.UPDATE_ALIGNMENT_DATA:
      return {
        ...state,
        alignmentData: {
          ...state.alignmentData,
          [action.verseCode]: action.alignmentData,
        },
      };

    case types.SELECT_SOURCE_TEXT_SEGMENT:
      return {
        ...state,
        source: state.source.concat({
          position: action.position,
        }),
      };

    case types.SELECT_TARGET_TEXT_SEGMENT:
      return {
        ...state,
        target: state.target.concat({
          position: action.position,
        }),
      };

    case types.DESELECT_SOURCE_TEXT_SEGMENT:
      return {
        ...state,
        source: state.source.filter((segment) => {
          return segment.position !== action.position;
        }),
      };

    case types.DESELECT_TARGET_TEXT_SEGMENT:
      return {
        ...state,
        target: state.target.filter((segment) => {
          return segment.position !== action.position;
        }),
      };

    case types.ADD_LINK:
      return {
        ...state,
        alignmentData: {
          ...state.alignmentData,
          [action.verseCode]: {
            ...state.alignmentData[action.verseCode],
            links: state.alignmentData[action.verseCode].links.concat({
              sources: action.sources,
              targets: action.targets,
            }),
            linksVerified: false,
          },
        },
      };

    case types.CLEAR_LINK_SELECTION:
      return { ...state, source: [], target: [], linkSelected: false };

    case types.SELECT_LINK:
      return { ...state, linkSelected: true };

    case types.REMOVE_LINK:
      return {
        ...state,
        linkSelected: false,
        source: [],
        target: [],
        alignmentData: {
          ...state.alignmentData,
          [action.verseCode]: {
            ...state.alignmentData[action.verseCode],
            linksVerified: false,
            links: state.alignmentData[action.verseCode].links.filter(
              (link: any) => {
                return !(
                  _.isEqual(
                    _.sortBy(link.sources),
                    _.sortBy(
                      action.sourceAlt.map((source) => {
                        return source.position;
                      })
                    )
                  ) &&
                  _.isEqual(
                    _.sortBy(link.targets),
                    _.sortBy(
                      action.targetAlt.map((target) => {
                        return target.position;
                      })
                    )
                  )
                );
              }
            ),
          },
        },
      };

    case types.REVERSE_ALIGNMENT_DISPLAY:
      return {
        ...state,
        reverseAlignmentDisplay: !state.reverseAlignmentDisplay,
      };

    case types.RE_RENDER_LINKS:
      // eslint-disable-next-line no-case-declarations
      const timestamp = new Date().getTime();
      return { ...state, reRenderLinks: timestamp.toString() };

    default:
      return state;
  }
};
