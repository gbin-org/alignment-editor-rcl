/* eslint max-classes-per-file: "off" */
export type ManuscriptLanguageCode = 'H' | 'G' | 'A';

export const CONTENT_SEGMENT_CAT = ['adj', 'noun', 'num', 'verb'];

export enum DbNames {
  LexiconsCollection = 'lexicons',
  LexiconsEntriesCollection = 'entries',
  ManuscriptsCollection = 'translations',
  TranslationsCollection = 'translations',
  ChunksCollection = 'gbiTreeChunks',
  JsonTreeCollection = 'gbiTreeJson',
  ProjectTranslationsCollection = 'projectTranslations',
  VersesCollection = 'verses',
  LinkMemoryCollection = 'linkMemory',
  ChunkMemoryCollection = 'chunkMemory',
  DefaultVersification = 'S1',
  TestProjectDocId = 'testProject',
  SystemUser = 'system',
  StrongsX = 'strongsX',
  DictCollection = 'dictionary',
  Lemma = 'lemma',
  Hebrew = 'hebrew',
  Greek = 'greek',
}

export type MemoryCollection =
  | DbNames.LinkMemoryCollection
  | DbNames.ChunkMemoryCollection;

export interface TranslationLink {
  sources: number[];
  targets: number[];
}

export interface Time {
  seconds: number;
  nanoseconds: number;
}

export interface MemoryVerseReference {
  text: string;
  textId: string;
  locationKey: string;
  timestamp: Time;
  locationKeys?: string[];
}

export interface MemoryTargetData {
  targetText: string;
  verses?: MemoryVerseReference[];
  count?: number;
}

export interface ManuscriptSuggestions {
  textSuggestion: string;
  linkSuggestions: Record<string, string[]>;
  memorySuggestions: Record<string, MemoryTargetData[]>;
  targetSuggestions: Record<string, MemoryVerseReference[]>;
}

export interface ManuscriptData {
  cat: string;
  catIsContent: boolean;
  english: string;
  lemma: string;
  positionId: string;
  segment: string;
  strongs: string;
  strongsX: string;
  analysis: string;
}

export enum SyntaxGroupType {
  ADVERBIAL_MODIFIER = 'adv',
  ADVERB_PHRASE = 'advp',
  CLAUSE = 'cl',
  CONJUNCTION = 'conj',
  CONJUNCTION_HEBREW = 'cjp',
  NOUN_PHRASE = 'np',
  DIRECT_OBJECT = 'o',
  SECOND_OBJECT = 'o2',
  INDIRECT_OBJECT = 'io',
  NON_VERBAL_PREDICATE = 'p',
  PREP_PHRASE = 'pp',
  SUBJECT = 's',
  VERB = 'v',
  LINKING_VERB = 'vc',
  INTERJECTION = 'ijp',
  RELATIVE_PARTICLE = 'rel',
  PARTICLE = 'ptcl',
  DETERMINER = 'det',
  OBJECT_MARKER = 'om',
  OBJECT_COMPLEMENT = 'oc',
  PREPOSITION = 'prep',
  PREPOSITIONAL_PHRASE = 'pp',
  NUMERICAL_PHRASE = 'nump',
  ADJECTIVAL_PHRASE = 'adjp',
}

export interface SyntaxGroupData {
  type: string;
  level: number;
  startIndex: number;
  endIndex: number;
  startSegmentIndex: number;
  endSegmentIndex: number;
  renderLocations?: number[];
}

export interface ChunkData {
  chunk: string;
  segments: string[];
  segmentsIndex: number[];
  contentSegmentsIndex: number[];
}

export type LexiconData = Record<string, Record<string, string>>;
export type MorphologyData = Record<string, string>;

export type ManuscriptVerseDataField =
  | ManuscriptData[]
  | SyntaxGroupData[]
  | ChunkData[]
  | LexiconData
  | MorphologyData
  | {};

export interface ChapterData {
  lexiconData: LexiconData;
  manuscriptDataByVerse: Record<string, ManuscriptData[]>;
  syntaxGroupDataByVerse: Record<string, SyntaxGroupData[]>;
  textId: string;
  text: string;
  verses: string[];
}

export interface ProjectTranslationVerse {
  textId: string;
  text: string;
  textSegments: string[];

  sourceTextId?: string;
  sourceText?: string;
  sourceManuscriptData?: ManuscriptData[];
  sourceSegments?: string[];
  sourceSegmentsStrongsX?: string[];
  sourceChunkData?: ChunkData[];

  links?: TranslationLink[];
  linksVerified?: boolean;
  linksUpdatedBy?: string;
  linksUpdatedAt?: Date;

  lastVerifiedText?: string;
  lastVerifiedLinkKeys?: string[];
  lastVerifiedChunkKeys?: string[];
  lastVerifiedAt?: Date;

  complete?: boolean;

  author?: string;
  createdAt?: Date;

  updatedBy?: string;
  updatedAt?: Date;
}

export class ManuscriptVerse {
  public textId = '';

  public text = '';

  public chunkData: ChunkData[] = [];

  public manuscriptData: ManuscriptData[] = [];

  public textSegments: string[] = [];

  public textSegmentsPosition: string[] = [];

  public textSegmentsStrongsX: string[] = [];

  public constructor(
    textId: string,
    text: string,
    textSegments: string[],
    manuscriptData: ManuscriptData[],
    chunkData: ChunkData[]
  ) {
    this.textId = textId;
    this.text = text;
    this.textSegments = textSegments;
    this.chunkData = chunkData;
    this.manuscriptData = manuscriptData;
    this.textSegmentsPosition = manuscriptData?.map((data) => data.positionId);
    this.textSegmentsStrongsX = manuscriptData?.map((data) => data.strongsX);

    // Note: textSegments cannot be derived from manuscript data because it's segment includes puncutation, like period.
    // See John 1:2
    // this.textSegments = manuscriptData.map(data => data.segment);
  }
}

export interface TranslationMemory {
  readonly sourceText: string;
  readonly sourceSegments: string[];
  readonly sourceSegmentsCount?: number;

  readonly targetText: string;
  readonly targetSegments: string[];
  readonly totalSegmentsCount: number;

  readonly key?: string;
  readonly locationKey?: string;
  readonly targetSegmentsCount?: number;
  readonly count?: number;
  readonly verses?: MemoryVerseReference[];
}

export class TranslationMemoryItem implements TranslationMemory {
  key = '';

  locationKey = '';

  sourceText = '';

  sourceManuscript = '';

  sourceLemma = '';

  english = '';

  sourceSegments: string[] = [];

  sourceSegmentsCount = 0;

  targetText = '';

  targetSegments: string[] = [];

  targetSegmentsCount = 0;

  totalSegmentsCount = 0;

  count = 0;

  verses: MemoryVerseReference[] = [];

  constructor(
    sourceSegments: string[] = [],
    targetSegments: string[] = [],
    sourceLocations: number[] = [],
    targetLocations: number[] = [],
    sourceManuscripts: string[] = [],
    english: string[] = [],
    sourceLemmas: string[] = []
  ) {
    if (sourceSegments.length && targetSegments.length) {
      const cleansedTargetSegments = targetSegments.map((segment) =>
        TranslationMemoryItem.cleanseSegment(segment)
      );

      const sourceText = sourceSegments.join(' ');
      const targetText = cleansedTargetSegments.join(' ');
      this.key = `${sourceText}|${targetText}`;

      this.sourceText = sourceText;
      this.sourceManuscript = sourceManuscripts.join(' ');
      this.sourceLemma = sourceLemmas.join(' ');
      this.english = english.join(' ');
      this.sourceSegments = sourceSegments;
      this.sourceSegmentsCount = sourceSegments.length;

      this.targetText = targetText;
      this.targetSegments = cleansedTargetSegments;
      this.targetSegmentsCount = cleansedTargetSegments.length;

      this.totalSegmentsCount =
        this.sourceSegmentsCount + this.targetSegmentsCount;

      this.count = 1;
    }

    if (this.key && sourceLocations.length && targetLocations.length) {
      this.locationKey = `${TranslationMemoryItem.locationsToKey(
        sourceLocations
      )}|${TranslationMemoryItem.locationsToKey(targetLocations)}`;
    }
  }

  getKeyLocation(): string {
    return `${this.key}:${this.locationKey}`;
  }

  static locationsToKey(locations: number[]): string {
    return locations
      .sort((i1, i2) => i1 - i2)
      .filter((value, index, self) => self.indexOf(value) === index)
      .map(String)
      .join('+');
  }

  static cleanseSegment(segment: string): string {
    let cleansed = segment.replace(/[.,"“”‘¿?():;!—<>]/g, '');

    // remove single quote only if it is in the beginning or end of a segment
    cleansed = cleansed.replace(/^'+|[’']+$/g, '');

    return cleansed;
  }
}
