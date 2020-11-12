export type LinkType = 'manual' | 'machine';

export interface Link {
  id: number;
  sources: number[];
  targets: number[];
  type: LinkType;
}
