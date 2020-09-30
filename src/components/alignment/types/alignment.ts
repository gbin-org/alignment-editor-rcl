import { SelectedTextSegment, Gloss } from "../structs";
import noop from "../noop";

export const FETCH_ALIGNMENT_DATA = "FETCH_DATA_DATA";
export const FETCH_ALIGNMENT_DATA_REQUEST = "FETCH_ALIGNMENT_DATA_REQUEST";
export const FETCH_ALIGNMENT_DATA_SUCCESS = "FETCH_ALIGNMENT_DATA_SUCCESS";
export const FETCH_ALIGNMENT_DATA_FAILURE = "FETCH_ALIGNMENT_DATA_FAILURE";
export const UPDATE_ALIGNMENT_DATA = "UPDATE_ALIGNMENT_DATA";
export const SELECT_SOURCE_TEXT_SEGMENT = "SELECT_SOURCE_TEXT_SEGMENT";
export const SELECT_TARGET_TEXT_SEGMENT = "SELECT_TARGET_TEXT_SEGMENT";
export const DESELECT_SOURCE_TEXT_SEGMENT = "DESELECT_SOURCE_TEXT_SEGMENT";
export const DESELECT_TARGET_TEXT_SEGMENT = "DESELECT_TARGET_TEXT_SEGMENT";
export const ADD_LINK = "ADD_LINK ";
export const CLEAR_LINK_SELECTION = "CLEAR_LINK_SELECTION";
export const SELECT_LINK = "SELECT_LINK";
export const REMOVE_LINK = "REMOVE_LINK";
export const REVERSE_ALIGNMENT_DISPLAY = "REVERSE_ALIGNMENT_DISPLAY";
export const RE_RENDER_LINKS = "RE_RENDER_LINKS";

export interface ProfileRTLAlignstate {
  isRTL?: boolean;
  isNTrtlAlignSource: boolean;
  isOTrtlAlignSource: boolean;
  isNTltrAlignSource: boolean;
  isOTltrAlignSource: boolean;
  isNTrtlAlignTarget: boolean;
  isOTrtlAlignTarget: boolean;
  isNTltrAlignTarget: boolean;
  isOTltrAlignTarget: boolean;
  verseCode: string;
  uid: string;
  iconPosition: string;
  reverseAlignmentDisplay: boolean;
  clearLinkSelectionsFunc: Function;
}

interface ReRenderLinks {
  type: typeof RE_RENDER_LINKS;
}

interface FetchAlignmentData {
  type: typeof FETCH_ALIGNMENT_DATA;
}

interface FetchAlignmentDataRequest {
  type: typeof FETCH_ALIGNMENT_DATA_REQUEST;
  projectId: string;
  verseCode: string;
}

interface FetchAlignmentDataSuccess {
  type: typeof FETCH_ALIGNMENT_DATA_SUCCESS;
  projectId: string;
  verseCode: string;
  data: any;
}

interface FetchAlignmentDataFailure {
  type: typeof FETCH_ALIGNMENT_DATA_FAILURE;
  error: any;
}

interface UpdateAlignmentData {
  type: typeof UPDATE_ALIGNMENT_DATA;
  verseCode: string;
  alignmentData: any;
}

interface SelectSourceTextSegment {
  type: typeof SELECT_SOURCE_TEXT_SEGMENT;
  position: number;
}

interface SelectTargetTextSegment {
  type: typeof SELECT_TARGET_TEXT_SEGMENT;
  position: number;
}

interface DeSelectSourceTextSegment {
  type: typeof DESELECT_SOURCE_TEXT_SEGMENT;
  position: number;
}

interface DeSelectTargetTextSegment {
  type: typeof DESELECT_TARGET_TEXT_SEGMENT;
  position: number;
}

interface AddLink {
  type: typeof ADD_LINK;
  verseCode: string;
  sources: number[];
  targets: number[];
}

interface ClearLinkSelection {
  type: typeof CLEAR_LINK_SELECTION;
}

interface SelectLink {
  type: typeof SELECT_LINK;
}

interface RemoveLink {
  type: typeof REMOVE_LINK;
  verseCode: string;
  sourceAlt: SelectedTextSegment[];
  targetAlt: SelectedTextSegment[];
}

interface ReverseAlignmentDisplay {
  type: typeof REVERSE_ALIGNMENT_DISPLAY;
}

export type AlignmentActionTypes =
  | FetchAlignmentData
  | FetchAlignmentDataRequest
  | FetchAlignmentDataSuccess
  | FetchAlignmentDataFailure
  | UpdateAlignmentData
  | SelectSourceTextSegment
  | SelectTargetTextSegment
  | DeSelectSourceTextSegment
  | DeSelectTargetTextSegment
  | AddLink
  | ClearLinkSelection
  | SelectLink
  | RemoveLink
  | ReverseAlignmentDisplay
  | ReRenderLinks;

export interface AlignmentState {
  loading: boolean;
  isVisible: boolean;
  alignmentData: any;
  verseCode: string;
  source: SelectedTextSegment[];
  target: SelectedTextSegment[];
  linkSelected: boolean;
  reverseAlignmentDisplay: boolean;
  isRTL: boolean;
  isNTrtl: boolean;
  isOTrtl: boolean;
  isNTltr: boolean;
  isOTltr: boolean;
  isNTrtlAlignSource: boolean;
  isOTrtlAlignSource: boolean;
  isNTltrAlignSource: boolean;
  isOTltrAlignSource: boolean;
  isNTrtlAlignTarget: boolean;
  isOTrtlAlignTarget: boolean;
  isNTltrAlignTarget: boolean;
  isOTltrAlignTarget: boolean;
  reRenderLinks: string;
  reRenderLinksFunc?: Function;
}

export interface AlignmentProps {
  loading: boolean;
  isVisible: boolean;
  verifyAlignmentFunc: Function;
  verseCode: string;
  alignmentData: any;
  fetchDataFunc: Function;
  links: any;
  sourceText: any;
  targetText: any;
  isReadOnly: boolean;
  reverseAlignmentDisplay: boolean;
  refDict: Map<string, any>;
  updateLinkRefsFunc: Function;
  source: SelectedTextSegment[];
  target: SelectedTextSegment[];
  glosses: Gloss[];
  addLinkFunc: Function;
  selectSourceTextSegmentFunc: Function;
  selectTargetTextSegmentFunc: Function;
  clearLinkSelectionsFunc: Function;
  selectLinkFunc: Function;
  linkSelected: boolean;
  removeSelectedLinkFunc: Function;
  reverseAlignmentDisplayFunc: Function;
  closeAlignmentFunc: Function;
  uncheckCompleteBoxFunc: Function;
  openEditorFunc: Function;
  fetchSuggestionFunc: Function;
  updateVerseStatusFunc: Function;
  isRTL: boolean;
  isNTrtl: boolean;
  isOTrtl: boolean;
  isNTltr: boolean;
  isOTltr: boolean;
  isNTrtlAlignSource: boolean;
  isOTrtlAlignSource: boolean;
  isNTltrAlignSource: boolean;
  isOTltrAlignSource: boolean;
  isNTrtlAlignTarget: boolean;
  isOTrtlAlignTarget: boolean;
  isNTltrAlignTarget: boolean;
  isOTltrAlignTarget: boolean;
  reRenderLinks: string;
  reRenderLinksFunc?: Function;
}

export const DefaultAlignmentProps: AlignmentProps = {
  loading: false,
  isVisible: false,
  verifyAlignmentFunc: noop,
  updateLinkRefsFunc: noop,
  fetchDataFunc: noop,
  verseCode: "",
  alignmentData: {},
  links: {},
  sourceText: [],
  targetText: [],
  isReadOnly: false,
  reverseAlignmentDisplay: true,
  refDict: new Map(),
  source: new Array<SelectedTextSegment>(),
  target: new Array<SelectedTextSegment>(),
  glosses: new Array<Gloss>(),
  addLinkFunc: noop,
  selectSourceTextSegmentFunc: noop,
  selectTargetTextSegmentFunc: noop,
  clearLinkSelectionsFunc: noop,
  selectLinkFunc: noop,
  linkSelected: false,
  removeSelectedLinkFunc: noop,
  reverseAlignmentDisplayFunc: noop,
  closeAlignmentFunc: noop,
  uncheckCompleteBoxFunc: noop,
  openEditorFunc: noop,
  fetchSuggestionFunc: noop,
  updateVerseStatusFunc: noop,
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
  reRenderLinksFunc: noop,
};

export default DefaultAlignmentProps;
