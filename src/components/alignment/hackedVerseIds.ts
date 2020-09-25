/* istanbul ignore file */
// A list of verse IDs that are forced into the UI
// for hacky versification reasons.

const hackedButNotHiddenIds = ['16007068', '44019041', '44024007', '45016024', '47013014'];

const hackedVerseIds = [
  '16007068',
  '19011000',
  '19013006',
  '19014000',
  '19015000',
  '19016000',
  '19017000',
  '19023000',
  '19024000',
  '19025000',
  '19026000',
  '19027000',
  '19028000',
  '19029000',
  '19032000',
  '19035000',
  '19037000',
  '19050000',
  '19066000',
  '19072000',
  '19073000',
  '19074000',
  '19078000',
  '19079000',
  '19082000',
  '19086000',
  '19087000',
  '19090000',
  '19098000',
  '19100000',
  '19101000',
  '19103000',
  '19109000',
  '19110000',
  '19120000',
  '19121000',
  '19122000',
  '19123000',
  '19124000',
  '19125000',
  '19126000',
  '19127000',
  '19128000',
  '19129000',
  '19130000',
  '19131000',
  '19132000',
  '19133000',
  '19134000',
  '19138000',
  '19139000',
  '19141000',
  '19143000',
  '19144000',
  '19145000',
  '23064001',
  '44019041',
  '44024007',
  '45016024',
  '47013014',
];

export const isHackedForAlignment = (verseId: string): boolean => {
  return !hackedVerseIds.includes(verseId);
};

export const isHackedForDisplay = (verseId: string): boolean => {
  return !hackedVerseIds.includes(verseId) || hackedButNotHiddenIds.includes(verseId);
};
