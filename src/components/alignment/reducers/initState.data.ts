import { SelectedTextSegment } from '../structs';
import { WholeAppState } from './index';

const initialState: WholeAppState = {
  alignment: {
    loading: false,
    isVisible: false,
    alignmentData: {},
    verseCode: '',
    source: new Array<SelectedTextSegment>(),
    target: new Array<SelectedTextSegment>(),
    linkSelected: false,
    reverseAlignmentDisplay: false,
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
    reRenderLinks: '',
  },
};

export default initialState;
