#### Rendering a source text

```ts
<TextPortion
  type="source"
  textSegments={[
    { text: 'ταχὺς', color: 0, group: 0, type: 'source', position: 1 },
    {
      text: 'εἰς',
      color: 0,
      group: 0,
      type: 'source',
      position: 2,
      catIsContent: false,
    },
    {
      text: 'τὸ',
      color: 0,
      group: 0,
      type: 'source',
      position: 3,
      catIsContent: false,
    },
    { text: 'ἀκοῦσαι', color: 0, group: 0, type: 'source', position: 4 },
  ]}
  selectTextSegmentFunc={(type, position) => {}}
  deSelectTextSegmentFunc={(type, position) => {}}
/>
```

#### Rendering a target text

```ts
<TextPortion
  type="source"
  textSegments={[
    { text: 'quick', color: 0, group: 0, type: 'source', position: 1 },
    { text: 'to', color: 0, group: 0, type: 'source', position: 2 },
    { text: 'listen', color: 0, group: 0, type: 'source', position: 3 },
  ]}
  selectTextSegmentFunc={(type, position) => {}}
  deSelectTextSegmentFunc={(type, position) => {}}
/>
```
