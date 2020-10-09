export type TextSegmentType = "source" | "target";

export interface TextSegment {
  type: "source" | "target";
  position: number;
  text: string;
  group: number;
  color: number;
  catIsContent?: boolean;
  strongsX?: string;
  english?: string;
  lemma?: string;
}
