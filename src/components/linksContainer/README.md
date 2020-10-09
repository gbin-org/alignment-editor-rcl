#### Quick to Listen

```ts
<LinksContainer
  sourceSegments={[
    { text: 'ταχὺς', color: 0, group: 0, type: 'source', position: 0 },
    {
      text: 'εἰς',
      color: 0,
      group: 0,
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
    { text: 'ἀκοῦσαι', color: 0, group: 0, type: 'source', position: 3 },
  ]}
  targetSegments={[
    { text: 'quick', color: 0, group: 0, type: 'source', position: 0 },
    { text: 'to', color: 0, group: 0, type: 'source', position: 1 },
    { text: 'listen', color: 0, group: 0, type: 'source', position: 2 },
  ]}
  selectTextSegmentFunc={(type, position) => {}}
  deSelectTextSegmentFunc={(type, position) => {}}
  links={[
    { sources: [0], targets: [0], type: 'manual' },
    { sources: [0], targets: [1], type: 'manual' },
    { sources: [1], targets: [1], type: 'manual' },
    { sources: [2], targets: [2], type: 'manual' },
    { sources: [3], targets: [2], type: 'manual' },
  ]}
/>
```

#### Long Example

```ts
<LinksContainer
  sourceSegments={[
    { text: 'יִּקָּרְא֣וּ', color: 0, group: 0, type: 'source', position: 0 },
    { text: 'הַמֶּ֣לֶךְ', color: 0, group: 0, type: 'source', position: 1 },
    { text: 'בַּחֹ֨דֶשׁ', color: 0, group: 0, type: 'source', position: 2 },
    { text: 'חֹ֣דֶשׁ', color: 0, group: 0, type: 'source', position: 3 },
    { text: 'בִּשְׁלוֹשָׁ֣ה', color: 0, group: 0, type: 'source', position: 4 },
    { text: 'וְעֶשְׂרִ֤ים', color: 0, group: 0, type: 'source', position: 5 },
    { text: 'יִּקָּרְא֣וּ', color: 0, group: 0, type: 'source', position: 6 },
    { text: 'הַמֶּ֣לֶךְ', color: 0, group: 0, type: 'source', position: 7 },
    { text: 'בַּחֹ֨דֶשׁ', color: 0, group: 0, type: 'source', position: 8 },
    { text: 'יִּקָּרְא֣וּ', color: 0, group: 0, type: 'source', position: 9 },
    { text: 'הַמֶּ֣לֶךְ', color: 0, group: 0, type: 'source', position: 10 },
    { text: 'בַּחֹ֨דֶשׁ', color: 0, group: 0, type: 'source', position: 11 },
    { text: 'יִּקָּרְא֣וּ', color: 0, group: 0, type: 'source', position: 12 },
    { text: 'הַמֶּ֣לֶךְ', color: 0, group: 0, type: 'source', position: 13 },
    { text: 'בַּחֹ֨דֶשׁ', color: 0, group: 0, type: 'source', position: 14 },
    {
      text: 'בִּשְׁלוֹשָׁ֣ה',
      color: 0,
      group: 0,
      type: 'source',
      position: 15,
    },
    { text: 'יִּקָּרְא֣וּ', color: 0, group: 0, type: 'source', position: 16 },
    { text: 'הַמֶּ֣לֶךְ', color: 0, group: 0, type: 'source', position: 17 },
    { text: 'בַּחֹ֨דֶשׁ', color: 0, group: 0, type: 'source', position: 18 },
    {
      text: 'בִּשְׁלוֹשָׁ֣ה',
      color: 0,
      group: 0,
      type: 'source',
      position: 19,
    },
    { text: 'יִּקָּרְא֣וּ', color: 0, group: 0, type: 'source', position: 20 },
    { text: 'הַמֶּ֣לֶךְ', color: 0, group: 0, type: 'source', position: 21 },
    { text: 'בַּחֹ֨דֶשׁ', color: 0, group: 0, type: 'source', position: 22 },
    {
      text: 'בִּשְׁלוֹשָׁ֣ה',
      color: 0,
      group: 0,
      type: 'source',
      position: 23,
    },
    { text: 'יִּקָּרְא֣וּ', color: 0, group: 0, type: 'source', position: 24 },
    { text: 'הַמֶּ֣לֶךְ', color: 0, group: 0, type: 'source', position: 25 },
    { text: 'בַּחֹ֨דֶשׁ', color: 0, group: 0, type: 'source', position: 26 },
    {
      text: 'בִּשְׁלוֹשָׁ֣ה',
      color: 0,
      group: 0,
      type: 'source',
      position: 27,
    },
    { text: 'יִּקָּרְא֣וּ', color: 0, group: 0, type: 'source', position: 28 },
    { text: 'הַמֶּ֣לֶךְ', color: 0, group: 0, type: 'source', position: 29 },
    { text: 'בַּחֹ֨דֶשׁ', color: 0, group: 0, type: 'source', position: 30 },
    {
      text: 'בִּשְׁלוֹשָׁ֣ה',
      color: 0,
      group: 0,
      type: 'source',
      position: 31,
    },
    { text: 'יִּקָּרְא֣וּ', color: 0, group: 0, type: 'source', position: 32 },
    { text: 'הַמֶּ֣לֶךְ', color: 0, group: 0, type: 'source', position: 33 },
    { text: 'בַּחֹ֨דֶשׁ', color: 0, group: 0, type: 'source', position: 34 },
    {
      text: 'בִּשְׁלוֹשָׁ֣ה',
      color: 0,
      group: 0,
      type: 'source',
      position: 35,
    },
    { text: 'יִּקָּרְא֣וּ', color: 0, group: 0, type: 'source', position: 36 },
    { text: 'הַמֶּ֣לֶךְ', color: 0, group: 0, type: 'source', position: 37 },
    { text: 'בַּחֹ֨דֶשׁ', color: 0, group: 0, type: 'source', position: 38 },
    {
      text: 'בִּשְׁלוֹשָׁ֣ה',
      color: 0,
      group: 0,
      type: 'source',
      position: 39,
    },
    { text: 'יִּקָּרְא֣וּ', color: 0, group: 0, type: 'source', position: 40 },
    { text: 'הַמֶּ֣לֶךְ', color: 0, group: 0, type: 'source', position: 41 },
    { text: 'בַּחֹ֨דֶשׁ', color: 0, group: 0, type: 'source', position: 42 },
    {
      text: 'בִּשְׁלוֹשָׁ֣ה',
      color: 0,
      group: 0,
      type: 'source',
      position: 43,
    },
    {
      text: 'בִּשְׁלוֹשָׁ֣ה',
      color: 0,
      group: 0,
      type: 'source',
      position: 44,
    },
  ]}
  targetSegments={[
    { text: 'The', color: 0, group: 0, type: 'target', position: 0 },
    { text: "king's", color: 0, group: 0, type: 'target', position: 1 },
    { text: 'scribes', color: 0, group: 0, type: 'target', position: 2 },
    { text: 'were', color: 0, group: 0, type: 'target', position: 3 },
    { text: 'summonded', color: 0, group: 0, type: 'target', position: 4 },
    { text: 'at', color: 0, group: 0, type: 'target', position: 5 },
    { text: 'the', color: 0, group: 0, type: 'target', position: 6 },
    { text: 'time', color: 0, group: 0, type: 'target', position: 7 },
    { text: 'in', color: 0, group: 0, type: 'target', position: 8 },
    { text: 'the', color: 0, group: 0, type: 'target', position: 9 },
    { text: 'third', color: 0, group: 0, type: 'target', position: 10 },
    { text: 'month,', color: 0, group: 0, type: 'target', position: 11 },
    { text: 'which', color: 0, group: 0, type: 'target', position: 12 },
    { text: 'happens', color: 0, group: 0, type: 'target', position: 13 },
    { text: 'to', color: 0, group: 0, type: 'target', position: 14 },
    { text: 'be', color: 0, group: 0, type: 'target', position: 15 },
    { text: 'the', color: 0, group: 0, type: 'target', position: 16 },
    { text: 'month', color: 0, group: 0, type: 'target', position: 17 },
    { text: 'of', color: 0, group: 0, type: 'target', position: 18 },
    { text: 'sivan', color: 0, group: 0, type: 'target', position: 19 },
    { text: 'on', color: 0, group: 0, type: 'target', position: 20 },
    { text: 'the', color: 0, group: 0, type: 'target', position: 21 },
    { text: 'twenty-third', color: 0, group: 0, type: 'target', position: 22 },
    { text: 'day.', color: 0, group: 0, type: 'target', position: 23 },
    { text: 'And', color: 0, group: 0, type: 'target', position: 24 },
    { text: 'an', color: 0, group: 0, type: 'target', position: 25 },
    { text: 'edict', color: 0, group: 0, type: 'target', position: 26 },
    { text: 'was', color: 0, group: 0, type: 'target', position: 27 },
    { text: 'written', color: 0, group: 0, type: 'target', position: 28 },
    { text: 'according', color: 0, group: 0, type: 'target', position: 29 },
    { text: 'to', color: 0, group: 0, type: 'target', position: 30 },
    { text: 'all', color: 0, group: 0, type: 'target', position: 31 },
    { text: 'that', color: 0, group: 0, type: 'target', position: 32 },
    { text: 'Mordecai', color: 0, group: 0, type: 'target', position: 33 },
    { text: 'commanded', color: 0, group: 0, type: 'target', position: 34 },
    { text: 'concerning', color: 0, group: 0, type: 'target', position: 35 },
    { text: 'the', color: 0, group: 0, type: 'target', position: 36 },
    { text: 'jews,', color: 0, group: 0, type: 'target', position: 37 },
    { text: 'to', color: 0, group: 0, type: 'target', position: 38 },
    { text: 'the', color: 0, group: 0, type: 'target', position: 39 },
    { text: 'satraps', color: 0, group: 0, type: 'target', position: 40 },
    { text: 'and', color: 0, group: 0, type: 'target', position: 41 },
    { text: 'the', color: 0, group: 0, type: 'target', position: 42 },
    { text: 'governors', color: 0, group: 0, type: 'target', position: 43 },
    { text: 'and', color: 0, group: 0, type: 'target', position: 44 },
  ]}
  selectTextSegmentFunc={(type, position) => {}}
  deSelectTextSegmentFunc={(type, position) => {}}
  links={[
    { sources: [0], targets: [43], type: 'manual' },
    { sources: [1], targets: [3], type: 'manual' },
    { sources: [5], targets: [4], type: 'manual' },
    { sources: [12], targets: [2], type: 'manual' },
    { sources: [43], targets: [0], type: 'manual' },
  ]}
/>
```
