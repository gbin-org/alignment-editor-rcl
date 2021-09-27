export type LinkType = 'manual' | 'machine';

export interface SimplifiedLink {
  sources: number[];
  targets: number[];
}

export interface Link {
  id: number;
  type: LinkType;
  sources: number[];
  targets: number[];
}
