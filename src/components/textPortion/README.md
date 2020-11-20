#### Rendering a text in "line" style

```ts
<TextPortion
  displayStyle="line"
  type="source"
  textSegments={[
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
    { text: 'בִּשְׁלוֹשָׁ֣ה', type: 'source', position: 15 },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 16 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 17 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 18 },
    { text: 'בִּשְׁלוֹשָׁ֣ה', type: 'source', position: 19 },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 20 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 21 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 22 },
    { text: 'בִּשְׁלוֹשָׁ֣ה', type: 'source', position: 23 },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 24 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 25 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 26 },
    { text: 'בִּשְׁלוֹשָׁ֣ה', type: 'source', position: 27 },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 28 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 29 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 30 },
    { text: 'בִּשְׁלוֹשָׁ֣ה', type: 'source', position: 31 },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 32 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 33 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 34 },
    { text: 'בִּשְׁלוֹשָׁ֣ה', type: 'source', position: 35 },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 36 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 37 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 38 },
    { text: 'בִּשְׁלוֹשָׁ֣ה', type: 'source', position: 39 },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 40 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 41 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 42 },
    { text: 'בִּשְׁלוֹשָׁ֣ה', type: 'source', position: 43 },
    { text: 'בִּשְׁלוֹשָׁ֣ה', type: 'source', position: 44 },
  ]}
  selectTextSegmentFunc={(type, position) => {}}
  deSelectTextSegmentFunc={(type, position) => {}}
/>
```

#### Rendering a text in "paragraph" style

```ts
<TextPortion
  displayStyle="paragraph"
  type="source"
  textSegments={[
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
    { text: 'בִּשְׁלוֹשָׁ֣ה', type: 'source', position: 15 },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 16 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 17 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 18 },
    { text: 'בִּשְׁלוֹשָׁ֣ה', type: 'source', position: 19 },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 20 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 21 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 22 },
    { text: 'בִּשְׁלוֹשָׁ֣ה', type: 'source', position: 23 },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 24 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 25 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 26 },
    { text: 'בִּשְׁלוֹשָׁ֣ה', type: 'source', position: 27 },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 28 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 29 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 30 },
    { text: 'בִּשְׁלוֹשָׁ֣ה', type: 'source', position: 31 },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 32 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 33 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 34 },
    { text: 'בִּשְׁלוֹשָׁ֣ה', type: 'source', position: 35 },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 36 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 37 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 38 },
    { text: 'בִּשְׁלוֹשָׁ֣ה', type: 'source', position: 39 },
    { text: 'יִּקָּרְא֣וּ', type: 'source', position: 40 },
    { text: 'הַמֶּ֣לֶךְ', type: 'source', position: 41 },
    { text: 'בַּחֹ֨דֶשׁ', type: 'source', position: 42 },
    { text: 'בִּשְׁלוֹשָׁ֣ה', type: 'source', position: 43 },
    { text: 'בִּשְׁלוֹשָׁ֣ה', type: 'source', position: 44 },
  ]}
  selectTextSegmentFunc={(type, position) => {}}
  deSelectTextSegmentFunc={(type, position) => {}}
/>
```
