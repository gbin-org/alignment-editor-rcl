export type LinkType = 'manual' | 'machine';

export interface Link {
  id: number;
  type: LinkType;
  sources: number[];
  targets: number[];
}
