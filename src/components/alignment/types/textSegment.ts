import React, { RefObject } from 'react';
import { TextSegment, SelectedTextSegment } from '../structs';
import noop from '../noop';

export interface TextSegmentState {
  selected: boolean;
  searchConcordance?: Function;
  isLeftPanelOpen?: boolean;
  linkedTargetWords?: string;
}

export interface TextSegmentProps {
  theRef: RefObject<HTMLSpanElement>;
  refName: string;
  segment: TextSegment;
  selectSourceTextSegmentFunc: Function;
  selectTargetTextSegmentFunc: Function;
  deSelectSourceTextSegmentFunc: Function;
  deSelectTargetTextSegmentFunc: Function;
  source: SelectedTextSegment[];
  target: SelectedTextSegment[];
  linkSelected: boolean;
  reverseDisplay: boolean;
  isLinkable: boolean;
  verseCode: string;
  alignmentData: any;
  searchConcordance?: Function;
  isLeftPanelOpen?: boolean;
  linksAlt: any;
  linkedTargetWords?: string;
}

export const DefaultTextSegmentProps: TextSegmentProps = {
  refName: '',
  segment: { text: '', group: 0, color: 0 },
  theRef: React.createRef<HTMLSpanElement>(),
  selectSourceTextSegmentFunc: noop,
  selectTargetTextSegmentFunc: noop,
  deSelectSourceTextSegmentFunc: noop,
  deSelectTargetTextSegmentFunc: noop,
  source: new Array<SelectedTextSegment>(),
  target: new Array<SelectedTextSegment>(),
  linkSelected: false,
  reverseDisplay: false,
  verseCode: '',
  alignmentData: {},
  isLinkable: false,
  searchConcordance: noop,
  linksAlt: [],
  linkedTargetWords: '',
};

export default DefaultTextSegmentProps;
