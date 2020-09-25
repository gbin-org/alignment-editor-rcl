export type GlossConfig = {
  shortName: string;
  fullName: string;
  language: string;
  about: string;
  versification: string;
  license: string;
  licenseAlignment: string;
  isEnabled: boolean;
  testaments: string[];
};

export type ParsedGloss = {
  textId: string;
  strongX: string;
  sourceText: string;
  sourceLemma: string;
  gloss: string;
};

export type Gloss = {
  textId: string;
  gloss: string;
};
