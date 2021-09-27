export interface UserTextSegment {
  text: string;
  partOfSpeech?: string;
}

export type TextSegmentType = 'source' | 'reference' | 'target';

export interface TextSegment {
  type: TextSegmentType;
  position: number;
  text: string;
  partOfSpeech?: string;
  catIsContent?: boolean;
  strongsX?: string;
  english?: string;
  lemma?: string;
}
