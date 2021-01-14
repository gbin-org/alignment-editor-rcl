export type TextSegmentType = 'source' | 'reference' | 'target';

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
