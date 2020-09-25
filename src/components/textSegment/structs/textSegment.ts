export interface TextSegment {
  text: string;
  group: number;
  color: number;
  catIsContent?: boolean;
  strongsX?: string;
  english?: string;
  lemma?: string;
}

export interface SelectedTextSegment {
  position: number;
}
