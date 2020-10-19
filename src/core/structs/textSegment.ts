export type TextSegmentType = 'source' | 'target';

export interface TextSegment {
  type: TextSegmentType;
  position: number;
  text: string;
  group?: number;
  catIsContent?: boolean;
  strongsX?: string;
  english?: string;
  lemma?: string;
}
