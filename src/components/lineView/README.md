#### A short example

- Function words can be marked and excluded from linking
- Many target words can be linked to a single source word

```ts
<LinksContainer
  displayStyle="full"
  sourceSegments={[
    { text: 'ταχὺς', type: 'source', position: 0 },
    {
      text: 'εἰς',
      type: 'source',
      position: 1,
      catIsContent: false,
    },
    {
      text: 'τὸ',
      color: 0,
      group: 0,
      type: 'source',
      position: 2,
      catIsContent: false,
    },
    { text: 'ἀκοῦσαι', type: 'source', position: 3 },
  ]}
  targetSegments={[
    { text: 'quick', type: 'target', position: 0 },
    { text: 'to', type: 'target', position: 1 },
    { text: 'listen', type: 'target', position: 2 },
  ]}
  selectTextSegmentFunc={(type, position) => {}}
  deSelectTextSegmentFunc={(type, position) => {}}
  links={[
    { sources: [0], targets: [0], type: 'manual' },
    { sources: [3], targets: [1, 2], type: 'manual' },
  ]}
/>
```

#### A longer example

- The filler content is approximate to the length of the longest verse in the OT
- Links that are a very far distance apart are included for demonstration purposes

```ts
<LinksContainer
  displayStyle="full"
  sourceSegments={[
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 0 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 1 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 2 },
    { text: 'חֹ֣דֶשׁ', type: 'source', position: 3 },
    { text: 'בִּשְׁלוֹשָׁ֣ה', type: 'source', position: 4 },
    { text: 'וְעֶשְׂרִ֤ים', type: 'source', position: 5 },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 6 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 7 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 8 },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 9 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 10 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 11 },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 12 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 13 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 14 },
    {
      text: 'בִּשְׁלוֹשָׁ֣ה',
      type: 'source',
      position: 15,
    },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 16 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 17 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 18 },
    {
      text: 'בִּשְׁלוֹשָׁ֣ה',
      type: 'source',
      position: 19,
    },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 20 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 21 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 22 },
    {
      text: 'בִּשְׁלוֹשָׁ֣ה',
      type: 'source',
      position: 23,
    },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 24 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 25 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 26 },
    {
      text: 'בִּשְׁלוֹשָׁ֣ה',
      type: 'source',
      position: 27,
    },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 28 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 29 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 30 },
    {
      text: 'בִּשְׁלוֹשָׁ֣ה',
      color: 0,
      group: 0,
      type: 'source',
      position: 31,
    },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 32 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 33 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 34 },
    {
      text: 'בִּשְׁלוֹשָׁ֣ה',
      type: 'source',
      position: 35,
    },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 36 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 37 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 38 },
    {
      text: 'בִּשְׁלוֹשָׁ֣ה',
      type: 'source',
      position: 39,
    },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 40 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 41 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 42 },
    {
      text: 'בִּשְׁלוֹשָׁ֣ה',
      type: 'source',
      position: 43,
    },
    {
      text: 'בִּשְׁלוֹשָׁ֣ה',
      type: 'source',
      position: 44,
    },
  ]}
  targetSegments={[
    { text: 'The', type: 'target', position: 0 },
    { text: "king's", type: 'target', position: 1 },
    { text: 'scribes', type: 'target', position: 2 },
    { text: 'were', type: 'target', position: 3 },
    { text: 'summoned', type: 'target', position: 4 },
    { text: 'at', type: 'target', position: 5 },
    { text: 'the', type: 'target', position: 6 },
    { text: 'time', type: 'target', position: 7 },
    { text: 'in', type: 'target', position: 8 },
    { text: 'the', type: 'target', position: 9 },
    { text: 'third', type: 'target', position: 10 },
    { text: 'month,', type: 'target', position: 11 },
    { text: 'which', type: 'target', position: 12 },
    { text: 'happens', type: 'target', position: 13 },
    { text: 'to', type: 'target', position: 14 },
    { text: 'be', type: 'target', position: 15 },
    { text: 'the', type: 'target', position: 16 },
    { text: 'month', type: 'target', position: 17 },
    { text: 'of', type: 'target', position: 18 },
    { text: 'sivan', type: 'target', position: 19 },
    { text: 'on', type: 'target', position: 20 },
    { text: 'the', type: 'target', position: 21 },
    { text: 'twenty-third', type: 'target', position: 22 },
    { text: 'day.', type: 'target', position: 23 },
    { text: 'And', type: 'target', position: 24 },
    { text: 'an', type: 'target', position: 25 },
    { text: 'edict', type: 'target', position: 26 },
    { text: 'was', type: 'target', position: 27 },
    { text: 'written', type: 'target', position: 28 },
    { text: 'according', type: 'target', position: 29 },
    { text: 'to', type: 'target', position: 30 },
    { text: 'all', type: 'target', position: 31 },
    { text: 'that', type: 'target', position: 32 },
    { text: 'Mordecai', type: 'target', position: 33 },
    { text: 'commanded', type: 'target', position: 34 },
    { text: 'concerning', type: 'target', position: 35 },
    { text: 'the', type: 'target', position: 36 },
    { text: 'jews,', type: 'target', position: 37 },
    { text: 'to', type: 'target', position: 38 },
    { text: 'the', type: 'target', position: 39 },
    { text: 'satraps', ype: 'target', position: 40 },
    { text: 'and', type: 'target', position: 41 },
    { text: 'the', type: 'target', position: 42 },
    { text: 'governors', type: 'target', position: 43 },
    { text: 'and', type: 'target', position: 44 },
    { text: 'the', type: 'target', position: 45 },
    { text: 'nobels', type: 'target', position: 46 },
    { text: 'of', type: 'target', position: 47 },
    { text: 'the', type: 'target', position: 48 },
    { text: '127', type: 'target', position: 49 },
    { text: 'provinces', type: 'target', position: 50 },
    { text: 'stretching', type: 'target', position: 51 },
    { text: 'from', type: 'target', position: 52 },
    { text: 'India', type: 'target', position: 53 },
    { text: 'to', type: 'target', position: 54 },
    { text: 'Cush', type: 'target', position: 55 },
    { text: 'these', type: 'target', position: 56 },
    { text: 'orders', type: 'target', position: 57 },
    { text: 'were', type: 'target', position: 58 },
    { text: 'written', type: 'target', position: 59 },
    { text: 'in', type: 'target', position: 60 },
    { text: 'the', type: 'target', position: 61 },
    { text: 'script', type: 'target', position: 62 },
    { text: 'of', type: 'target', position: 63 },
    { text: 'each', type: 'target', position: 64 },
    { text: 'province', type: 'target', position: 65 },
    { text: 'and', type: 'target', position: 66 },
    { text: 'the', type: 'target', position: 67 },
    { text: 'language', type: 'target', position: 68 },
    { text: 'of', type: 'target', position: 69 },
    { text: 'each', type: 'target', position: 70 },
    { text: 'people', type: 'target', position: 71 },
    { text: 'and', type: 'target', position: 72 },
    { text: 'also', type: 'target', position: 73 },
    { text: 'to', type: 'target', position: 74 },
    { text: 'the', type: 'target', position: 75 },
    { text: 'Jews', type: 'target', position: 76 },
    { text: 'in', type: 'target', position: 77 },
    { text: 'their', type: 'target', position: 78 },
    { text: 'own', type: 'target', position: 79 },
    { text: 'script', type: 'target', position: 80 },
    { text: 'and', type: 'target', position: 81 },
    { text: 'language', type: 'target', position: 82 },
  ]}
  selectTextSegmentFunc={(type, position) => {}}
  deSelectTextSegmentFunc={(type, position) => {}}
  links={[
    { sources: [0], targets: [82], type: 'manual' },
    { sources: [1], targets: [3], type: 'manual' },
    { sources: [5], targets: [4], type: 'manual' },
    { sources: [12], targets: [2], type: 'manual' },
    { sources: [43], targets: [0], type: 'manual' },
  ]}
/>
```

#### Complex "many to many" example

- Many to many links are supported
- Links can be one or many on both source and target side
- Many to many link groups are shown with matching color for visual cue
- Link lines are drawn between earliest occurring source/target pair
- (Someday: support the idea of a "primary" link for a many to many group)

```ts
<LinksContainer
  displayStyle="full"
  sourceSegments={[
    { text: 'ταχὺς', type: 'source', position: 0 },
    { text: 'εἰς', type: 'source', position: 1 },
    { text: 'τὸ', type: 'source', position: 2 },
    { text: 'ἀκοῦσαι', type: 'source', position: 3 },
    { text: 'ταχὺς', type: 'source', position: 4 },
    { text: 'εἰς', type: 'source', position: 5 },
    { text: 'τὸ', type: 'source', position: 6 },
    { text: 'ἀκοῦσαι', type: 'source', position: 7 },
    { text: 'ἀκοῦσαι', type: 'source', position: 8 },
    { text: 'ἀκοῦσαι', type: 'source', position: 9 },
    { text: 'ἀκοῦσαι', type: 'source', position: 10 },
  ]}
  targetSegments={[
    { text: 'quick', type: 'target', position: 0 },
    { text: 'to', type: 'target', position: 1 },
    { text: 'listen', type: 'target', position: 2 },
    { text: 'slow', type: 'target', position: 3 },
    { text: 'to', type: 'target', position: 4 },
    { text: 'anger', type: 'target', position: 5 },
    { text: 'and', type: 'target', position: 6 },
    { text: 'in', type: 'target', position: 7 },
    { text: 'all', type: 'target', position: 8 },
    { text: 'things', type: 'target', position: 9 },
    { text: 'love', type: 'target', position: 10 },
  ]}
  selectTextSegmentFunc={(type, position) => {}}
  deSelectTextSegmentFunc={(type, position) => {}}
  links={[
    { sources: [0, 1], targets: [0, 1], type: 'manual' },
    { sources: [3], targets: [2], type: 'manual' },
    { sources: [4], targets: [4, 5], type: 'manual' },
    { sources: [7, 9], targets: [7, 10], type: 'manual' },
    { sources: [8, 10], targets: [6, 8, 9], type: 'manual' },
  ]}
/>
```