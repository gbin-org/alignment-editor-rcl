export type LinkType = 'manual' | 'machine';

export interface Link {
  sources: number[];
  targets: number[];
  type: LinkType;
}
